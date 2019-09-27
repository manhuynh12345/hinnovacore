using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using Abp.UI;
using HinnovaAbp.Authorization;
using HinnovaAbp.Entities;
using HinnovaAbp.Menus.Dto;
using HinnovaAbp.Roles.Dto;
using HinnovaAbp.SharedDtos;
using Microsoft.EntityFrameworkCore;

namespace HinnovaAbp.Menus
{
    [AbpAuthorize(PermissionNames.Pages_Menus)]
    public class MenuAppService : HinnovaAbpAppServiceBase, IMenuAppService
    {
        private readonly IRepository<Menu, int> _menuRepository;
        private readonly IDapperRepository<Menu, int> _menuDapperRepository;

        public MenuAppService(IRepository<Menu, int> menuRepository, IDapperRepository<Menu, int> menuDapperRepository)
        {
            _menuRepository = menuRepository;
            _menuDapperRepository = menuDapperRepository;
        }

        public async Task<List<MenuListDto>> GetListAsync(GetMenuListInput input)
        {
            var menus = await _menuDapperRepository.QueryAsync<MenuListDto>("Menu_Search @Name, @Type", new { input.Name, input.Type });
            return menus.ToList();
        }
        
        public Task<List<PermissionDto>> GetRootPermissionsAsync()
        {
            var permissions = PermissionManager.GetAllPermissions().Where(p => p.Parent == null).ToList();

            return Task.FromResult(ObjectMapper.Map<List<PermissionDto>>(permissions));
        }

        public async Task<List<MenuListDto>> GetAllActiveAsync()
        {
            var menus = await _menuRepository.GetAll().AsNoTracking().ToListAsync();
            return ObjectMapper.Map<List<MenuListDto>>(menus);
        }

        public async Task ReOrderAsync(ReOrderInputDto input)
        {
            await _menuDapperRepository.ExecuteAsync("Menu_ReOrder @SourceId, @TargetId", new { input.SourceId, input.TargetId });
        }

        public async Task<MenuDetailOutput> GetDetailAsync(int input)
        {
            var menu = await _menuRepository
            .GetAll()
            .Where(e => e.Id == input)
            .FirstOrDefaultAsync();

            if (menu == null)
            {
                throw new UserFriendlyException("Could not found the menu, maybe it's deleted.");
            }

            return menu.MapTo<MenuDetailOutput>();
        }

        public async Task<List<IdNameDto>> GetAllIndicesAsync()
        {
            var indices = await (from m in _menuRepository.GetAll().AsNoTracking()
                                 orderby m.Index descending
                                 select new { Id = m.Index, Name = m.Index + " - " + m.Name }).ToListAsync();
            return ObjectMapper.Map<List<IdNameDto>>(indices);
        }

        public async Task<IdNameDto> GetIndexByIdAsync(int id, int index)
        {
            var item = await (from m in _menuRepository.GetAll().AsNoTracking().Where(p => p.Id.Equals(id) && p.Index.Equals(index))
                                 select new { Id = m.Index, Name = m.Index + " - " + m.Name }).SingleOrDefaultAsync();
            var result = item == null ? new IdNameDto() { Id = index, Name = index.ToString() } : ObjectMapper.Map<IdNameDto>(item);
            return ObjectMapper.Map<IdNameDto>(item);
        }

        public async Task CreateAsync(CreateMenuInput input)
        {
            var menu = ObjectMapper.Map<Menu>(input);
            await _menuRepository.InsertAsync(menu);
        }

        public async Task UpdateAsync(MenuDto input)
        {
            var menu = await _menuRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, menu);
        }

        //[AbpAuthorize(AppPermissions.Pages_Menus_Delete)]
        public async Task DeleteAsync(int input)
        {
            await _menuRepository.DeleteAsync(input);
        }

    }
}

