using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using HinnovaAbp.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using HinnovaAbp.DashboardConfig.Dto;

namespace HinnovaAbp.DashboardConfig
{
    public class DashboardConfigAppService : HinnovaAbpAppServiceBase, IDashboardConfigAppService
    {
        private readonly IRepository<Dashboard, int> _dashboardRepository;
        private readonly IRepository<DashboardDetail, int> _dashboardDetailRepository;

        public DashboardConfigAppService(IRepository<Dashboard, int> dashboardRepository, IRepository<DashboardDetail, int> dashboardDetailRepository)
        {
            _dashboardRepository = dashboardRepository;
            _dashboardDetailRepository = dashboardDetailRepository;
        }

        public async Task<List<DashboardDto>> GetListDashboardByName(string name)
        {
            if (name == null) { name = ""; }
            var result = await (from d in _dashboardRepository.GetAll()
                                where d.Name.Contains(name) && d.isActive == true && d.isDelete == false && d.isPublish == true
                                select d).ToListAsync();
            return ObjectMapper.Map<List<DashboardDto>>(result);
        }

        public async Task<int> UpdateDashboardAsync(DashboardDto dashboardDto)
        {
            var dashboard = await _dashboardRepository.GetAsync(dashboardDto.Id);
            ObjectMapper.Map(dashboardDto, dashboard);
            return dashboardDto.Id;
        }

        public async Task<int> CreateDashboardAsync(DashboardDto dashboardDto)
        {
            var newRow = ObjectMapper.Map<Dashboard>(dashboardDto);
            return await _dashboardRepository.InsertAndGetIdAsync(newRow);
        }

        public async Task<DashboardDto> GetDashboardAsync(int id)
        {
            var result = await(from t in _dashboardRepository.GetAll()
                               where t.isActive == true && t.isDelete == false && t.Id == id
                               select t).SingleOrDefaultAsync();
            return ObjectMapper.Map<DashboardDto>(result);
        }

        public async Task CreateDashboardDetailAsync(List<DashboardDetailDto> dashboardDetailDtos)
        {
            foreach (var item in dashboardDetailDtos)
            {
                var newRow = ObjectMapper.Map<DashboardDetail>(item);
                await _dashboardDetailRepository.InsertAsync(newRow);
            }
        }

        public async Task UpdateDashboardDetailAsync(List<DashboardDetailDto> dashboardDetailDtos)
        {
            var olddashboardDetail = await (from t in _dashboardDetailRepository.GetAll()
                                            where t.DashboardId == dashboardDetailDtos[0].DashboardId
                                            select t).ToListAsync();
            foreach (var item in olddashboardDetail)
            {
                await _dashboardDetailRepository.DeleteAsync(item);
            }
            foreach (var item in dashboardDetailDtos)
            {
                var newRow = ObjectMapper.Map<DashboardDetail>(item);
                await _dashboardDetailRepository.InsertAsync(newRow);
            }
        }

        public async Task<List<DashboardDetailDto>> GetDashboardDetailAsync(int dashboardId)
        {
            var result = await (from d in _dashboardDetailRepository.GetAll()
                               where d.DashboardId == dashboardId
                               select d).ToListAsync();
            return ObjectMapper.Map<List<DashboardDetailDto>>(result);
        }
    }
}
