using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using HinnovaAbp.DashboardItems.Dto;
using HinnovaAbp.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace HinnovaAbp.DashboardItems
{
    public class DashboardItemAppService : HinnovaAbpAppServiceBase, IDashboardItemAppService
    {
        private readonly IRepository<DashboardItem, int> _dashboardItemRepository;
        private readonly IRepository<DashboardItemType, int> _dashboardItemTypeRepository;
        private readonly IRepository<DashboardItemGroup, int> _dashboardItemGroupRepository;


        public DashboardItemAppService(IRepository<DashboardItem, int> dashboardItemRepository, IRepository<DashboardItemType, int> dashboardItemTypeRepository, IRepository<DashboardItemGroup, int> dashboardItemGroupRepository)
        {
            _dashboardItemRepository = dashboardItemRepository;
            _dashboardItemTypeRepository = dashboardItemTypeRepository;
            _dashboardItemGroupRepository = dashboardItemGroupRepository;
        }

        public async Task<DashboardItemDto> GetDashboardItem(int id)
        {
            var result = await (from t in _dashboardItemRepository.GetAll()
                               where t.isActive == true && t.isDelete == false && t.Id == id
                               select t).SingleOrDefaultAsync();
            return ObjectMapper.Map<DashboardItemDto>(result);
        }

        public async Task<List<DashboardItemTypeDto>> GetItemType()
        {
            var result = await (from t in _dashboardItemTypeRepository.GetAll()
                              where t.isActive == true && t.isDelete == false
                              select t).ToListAsync();
            return ObjectMapper.Map<List<DashboardItemTypeDto>>(result);
        }

        public async Task<List<DashboardItemDisplay>> GetListDashboardItem(string name, string type, string _group)
        {
            if (name == null) { name = ""; }
            var result = await (from i in _dashboardItemRepository.GetAll()
                            join t in _dashboardItemTypeRepository.GetAll() on i.ItemType equals t.Code
                            join g in _dashboardItemGroupRepository.GetAll() on i.ItemGroup equals g.Code
                            where i.ItemName.Contains(name) && (i.ItemCode == type || type == "ALL") && i.isActive == true && i.isDelete == false
                                  && (i.ItemGroup == _group || _group == "ALL") && g.isActive == true && g.isDelete == false
                            select new { i.ItemName, i.ItemCode, TypeName = t.Name, GroupName = g.Name, i.isActive, i.Id }).ToListAsync();
            return ObjectMapper.Map<List<DashboardItemDisplay>>(result);
        }

        public async Task UpdateDashboardItemAsync(DashboardItemDto input)
        {
            var menu = await _dashboardItemRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, menu);
        }

        public async Task CreateDashboardItemAsync(DashboardItemDto input)
        {
            var menu = ObjectMapper.Map<DashboardItem>(input);
            await _dashboardItemRepository.InsertAsync(menu);
        }

        public async Task<List<DashboardItemGroupDto>> GetItemGroup()
        {
            var result = await(from t in _dashboardItemGroupRepository.GetAll()
                               where t.isActive == true && t.isDelete == false
                               select t).ToListAsync();
            return ObjectMapper.Map<List<DashboardItemGroupDto>>(result);
        }
    }
}
