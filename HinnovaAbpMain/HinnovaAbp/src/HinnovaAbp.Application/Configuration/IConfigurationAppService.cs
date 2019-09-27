using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using HinnovaAbp.Configuration.Dto;
using HinnovaAbp.Menus.Dto;

namespace HinnovaAbp.Configuration
{
    public interface IConfigurationAppService : IApplicationService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);

        Task<List<MenuDisplayDto>> GetDisplayListAsync();
    }
}
