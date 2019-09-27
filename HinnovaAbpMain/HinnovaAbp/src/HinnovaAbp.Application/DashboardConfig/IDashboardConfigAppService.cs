using Abp.Application.Services;
using HinnovaAbp.DashboardConfig.Dto;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HinnovaAbp.DashboardConfig
{
    public interface IDashboardConfigAppService : IApplicationService
    {
        Task<List<DashboardDto>> GetListDashboardByName(string name);
        Task<DashboardDto> GetDashboardAsync(int id);
        Task<List<DashboardDetailDto>> GetDashboardDetailAsync(int dashboardId);
        Task<int> UpdateDashboardAsync(DashboardDto dashboardDto);
        Task<int> CreateDashboardAsync(DashboardDto dashboardDto);
        Task CreateDashboardDetailAsync(List<DashboardDetailDto> dashboardDetailDtos);
        Task UpdateDashboardDetailAsync(List<DashboardDetailDto> dashboardDetailDtos);
    }
}
