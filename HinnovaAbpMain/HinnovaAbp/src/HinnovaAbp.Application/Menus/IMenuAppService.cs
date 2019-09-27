using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using HinnovaAbp.Menus.Dto;
using HinnovaAbp.Roles.Dto;
using HinnovaAbp.SharedDtos;

namespace HinnovaAbp.Menus
{
    public interface IMenuAppService : IApplicationService
    {
        Task<List<MenuListDto>> GetListAsync(GetMenuListInput input);

        Task<List<MenuListDto>> GetAllActiveAsync();

        Task ReOrderAsync(ReOrderInputDto input);

        Task<List<PermissionDto>> GetRootPermissionsAsync();

        Task<MenuDetailOutput> GetDetailAsync(int input);

        Task<List<IdNameDto>> GetAllIndicesAsync();

        Task<IdNameDto> GetIndexByIdAsync(int id, int index);

        Task CreateAsync(CreateMenuInput input);

        Task UpdateAsync(MenuDto input);

        Task DeleteAsync(int input);
    }
}
