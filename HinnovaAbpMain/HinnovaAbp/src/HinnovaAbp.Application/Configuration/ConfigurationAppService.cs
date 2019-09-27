using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Dapper.Repositories;
using Abp.Extensions;
using Abp.Runtime.Session;
using HinnovaAbp.Configuration.Dto;
using HinnovaAbp.Entities;
using HinnovaAbp.Menus.Dto;

namespace HinnovaAbp.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : HinnovaAbpAppServiceBase, IConfigurationAppService
    {
        private readonly IDapperRepository<Menu, int> _menuDapperRepository;

        public ConfigurationAppService(IDapperRepository<Menu, int> menuDapperRepository)
        {
            _menuDapperRepository = menuDapperRepository;
        }

        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }

        public async Task<List<MenuDisplayDto>> GetDisplayListAsync()
        {
            var menus = await _menuDapperRepository.QueryAsync<MenuListDto>("Menu_Search @Name, @Type", new { Name = string.Empty, Type = string.Empty });

            menus = menus.Where(p => p.RequiredPermissionName.IsNullOrEmpty() || (!p.RequiredPermissionName.IsNullOrEmpty() && PermissionChecker.IsGranted(p.RequiredPermissionName))).ToList();
            var lstDisplay = new List<MenuDisplayDto>();
            ProcessMenuStructure(menus, lstDisplay);

            return lstDisplay;
        }

        private static void ProcessMenuStructure(IEnumerable<MenuListDto> menus, List<MenuDisplayDto> lstDisplay)
        {
            foreach (var m in menus)
            {
                var item = new MenuDisplayDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    PermissionName = m.RequiredPermissionName ?? string.Empty,
                    Icon = m.Icon ?? string.Empty,
                    Route = m.Link ?? string.Empty,
                };

                if (m.Parent.HasValue && m.Parent.Value != 0) // child
                {
                    var parent = lstDisplay.SingleOrDefault(p => p.Id == m.Parent.Value);
                    if (parent != null)
                    {
                        parent.Items.Add(item);
                    }
                }
                else // is parent
                {
                    lstDisplay.Add(item);
                }
            }
        }
    }
}
