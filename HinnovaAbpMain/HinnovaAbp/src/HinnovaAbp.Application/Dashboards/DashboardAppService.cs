using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using HinnovaAbp.DashboardConfig.Dto;
using HinnovaAbp.Dashboards.Dto;
using HinnovaAbp.Entities;
using HinnovaAbp.EntityFrameworkCore;
using HinnovaAbp.Layouts.Dto;
using HinnovaAbp.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HinnovaAbp.Dashboards
{
    public class DashboardAppService : IDashboardAppService
    {
        private readonly IRepository<Dashboard, int> _dashboardRepository;
        private readonly IDapperRepository<Dashboard, int> _dashboardDapperRepository;
        private readonly IRepository<DashboardItem, int> _dashboardItemlRepository;
        private readonly IDapperRepository<Layout, int> _layoutDapperRepository;
        private readonly IRepository<Layout, int> _layoutRepository;
        private readonly IRepository<ModuleMapDashboard, int> _moduleMapDashboardRepository;
        private readonly IRepository<Menu, int> _menuRepository;
        public IAbpSession AbpSession { get; set; }

        public DashboardAppService(IRepository<Dashboard, int> dashboardRepository, IDapperRepository<Dashboard, int> dashboardDapperRepository,
            IRepository<DashboardItem, int> dashboardItemlRepository, IDapperRepository<Layout, int> layoutDapperRepository,
            IRepository<Layout, int> layoutRepository, IRepository<ModuleMapDashboard, int> moduleMapDashboardRepository, IRepository<Menu, int> menuRepository)
        {
            _dashboardRepository = dashboardRepository;
            _dashboardDapperRepository = dashboardDapperRepository;
            _dashboardItemlRepository = dashboardItemlRepository;
            _layoutDapperRepository = layoutDapperRepository;
            _layoutRepository = layoutRepository;
            _moduleMapDashboardRepository = moduleMapDashboardRepository;
            _menuRepository = menuRepository;
        }

        public async Task<PrivateDashboardLayoutDto> GetPrivateDashboardLayoutAsync(int input)
        {
            var userid = AbpSession.UserId;
            var id = await _moduleMapDashboardRepository
                .GetAll()
                .Where(x => x.ModuleId == input)
                .Select(x => x.DashboardId)
                .FirstOrDefaultAsync();

            if (id > 0)
            {
                try
                {
                    var _layout = await _layoutDapperRepository.QueryAsync<LayoutConfigDto>("Dashboard_GetDashboardLayout @ID", new { id });
                    var _dashboard = await _dashboardDapperRepository.QueryAsync<DashboardDetailDto>("Dashboard_GetDashboardDetail @ID", new { id });
                    //var _code = await _dashboardDapperRepository.QueryAsync<Array>("Dashboard_GetCodeDashboardLayout @ID", new { id });
                    var _layoutId = await _dashboardRepository
                        .GetAll()
                        .Where(x => x.Id == id)
                        .Select(x => x.LayoutId).FirstOrDefaultAsync();
                    var _code = await _layoutRepository.GetAll().Where(x => x.Id == _layoutId).Select(x => x.Code).FirstOrDefaultAsync();

                    var result = new PrivateDashboardLayoutDto(_dashboard.ToList(),_layout.ToList(),_code,_layoutId, true);
                    return result;
                }
                catch (Exception e)
                {
                    var result = new PrivateDashboardLayoutDto();
                    return result;
                }
            }
            else
            {
                var result = new PrivateDashboardLayoutDto();
                return result;
            }
        }

        public async Task<DataVm> CreatePrivateDashboardAsync()
        {
            DataVm dataVm = new DataVm();
            try
            {
                var userid = AbpSession.UserId;
                Dashboard dashboard = Dashboard.Create("Dashboard", 0, userid, true, false, false);
                var rs = await _dashboardRepository.InsertAndGetIdAsync(dashboard);
                return DataVm.Success("Success", "Thành công", rs);
            }
            catch (Exception)
            {
                return DataVm.Fail("Error", "Lỗi");
            }
        }

        public async Task<DataVm> GetCurrentDashboardAsync()
        {
            try
            {
                var userid = AbpSession.UserId;
                var id = await _dashboardRepository
                    .GetAll()
                    .Where(x => x.UserCreated == userid)
                    .Select(x => x.Id)
                    .FirstOrDefaultAsync();
                return DataVm.Success("SUC-01", "Thành công", id);
            }
            catch (Exception e)
            {
                return DataVm.Fail("ERR", e.Message);
            }
        }

        public async Task<DataVm> GetItem(string code)
        {
            try
            {
                var items = await _dashboardItemlRepository
                    .GetAll()
                    .Where(x => x.isActive == true && x.isDelete == false && x.ItemCode == code)
                    .FirstOrDefaultAsync();
                if (items != null)
                    return DataVm.Success("SUC", "Thành công", items);
                else
                    return DataVm.Fail("ERR", "Không có dữ liệu");
            }
            catch (Exception e)
            {
                return DataVm.Fail("ERR", e.Message);
            }
        }

        public async Task<DataVm> GetDashboardLayoutAsync(string storename)
        {
            var userId = AbpSession.UserId;

            string rs = "";
            try
            {
                List<Parameter> list = new List<Parameter>();
                list.Add(new Parameter("@UserID", userId));
                rs = HinnovaAbpDbContext.executeStoreProcedure(storename, list);
            }
            catch (Exception e)
            {
                try
                {
                    List<Parameter> list = new List<Parameter>();
                    rs = HinnovaAbpDbContext.executeStoreProcedure(storename, list);
                }
                catch(Exception ex)
                {
                    return DataVm.Fail("ERR", "Không lấy được dữ liệu từ store: " + storename);
                }
            }
            return DataVm.Success("SUC", "Thành công", JsonConvert.DeserializeObject(rs));
        }

        public Task<int> GetCurrentModule(string input)
        {
            return _menuRepository
                .GetAll()
                .Where(x => x.Link.Trim() == input.Trim())
                .Select(x => x.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<int> UpdateCurrentDashboard(int moduleId, int dashboardId)
        {
            //Kiem tra xem current module da co dashboard chua
            var current = await _moduleMapDashboardRepository.GetAll()
                .Where(x => x.ModuleId == moduleId)
                .FirstOrDefaultAsync();
            if (current != null)
            {
                current.DashboardId = dashboardId;
                await _moduleMapDashboardRepository.UpdateAsync(current);
            }
            else
            {

                ModuleMapDashboard map = new ModuleMapDashboard();
                map.ModuleId = moduleId;
                map.DashboardId = dashboardId;
                await _moduleMapDashboardRepository.InsertAsync(map);
            }
            return 1;
        }
    }
}
