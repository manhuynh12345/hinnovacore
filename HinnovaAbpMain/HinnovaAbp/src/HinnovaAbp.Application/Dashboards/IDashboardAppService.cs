using Abp.Application.Services;
using HinnovaAbp.Dashboards.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HinnovaAbp.Dashboards
{
    public interface IDashboardAppService : IApplicationService
    {
        /// <summary>
        /// "private"
        /// </summary>
        /// <returns></returns>
        Task<PrivateDashboardLayoutDto> GetPrivateDashboardLayoutAsync(int input);
        /// <summary>
        /// "private/create"
        /// </summary>
        /// <returns></returns>
        Task<DataVm> CreatePrivateDashboardAsync();
        /// <summary>
        /// "private/current"
        /// </summary>
        /// <returns></returns>
        Task<DataVm> GetCurrentDashboardAsync();
        /// <summary>
        /// "GetItem/{code}"
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<DataVm> GetItem(string code);
        /// <summary>
        /// "storedata/{storename}"
        /// </summary>
        /// <param name="storeName"></param>
        /// <returns></returns>
        Task<DataVm> GetDashboardLayoutAsync(string storename);
        /// <summary>
        /// Get Id module hien tai
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<int> GetCurrentModule(string input);
        /// <summary>
        /// Cap nhat dashboard cho module
        /// </summary>
        /// <returns></returns>
        Task<int> UpdateCurrentDashboard(int moduleId, int dashboardId);
    }
}
