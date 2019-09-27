using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;
using System.Threading.Tasks;
using HinnovaAbp.DashboardItems.Dto;

namespace HinnovaAbp.DashboardItems
{
    public interface IDashboardItemAppService : IApplicationService
    {
        Task<List<DashboardItemTypeDto>> GetItemType();
        Task<List<DashboardItemGroupDto>> GetItemGroup();
        Task<List<DashboardItemDisplay>> GetListDashboardItem(string name, string type, string _group);
        Task<DashboardItemDto> GetDashboardItem(int id);
        Task CreateDashboardItemAsync(DashboardItemDto input);
        Task UpdateDashboardItemAsync(DashboardItemDto input);
    }
}
