using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using HinnovaAbp.Entities;
using HinnovaAbp.Layouts.Dto;
using Microsoft.EntityFrameworkCore;

namespace HinnovaAbp.Layouts
{
    public class LayoutAppService : HinnovaAbpAppServiceBase, ILayoutAppService
    {
        private readonly IRepository<Layout, int> _layoutRepository;
        private readonly IDapperRepository<Layout, int> _layoutDapperRepository;
        private readonly IRepository<LayoutConfig, int> _layoutConfigRepository;

        public LayoutAppService(IRepository<Layout, int> layoutRepository, IDapperRepository<Layout, int> layoutDapperRepository, IRepository<LayoutConfig, int> layoutConfigRepository)
        {
            _layoutRepository = layoutRepository;
            _layoutDapperRepository = layoutDapperRepository;
            _layoutConfigRepository = layoutConfigRepository;
        }

        public async Task<List<LayoutDto>> GetListAsync()
        {
            var layouts = await _layoutRepository
                .GetAll()
                .Where(x => x.IsActive == true).ToListAsync();

            return ObjectMapper.Map<List<LayoutDto>>(layouts);
        }

        public async Task<List<LayoutDto>> GetListWithParamAsync(GetListLayoutInput input)
        {
            var layouts = await _layoutDapperRepository.QueryAsync<LayoutDto>("Layout_Search @Name, @Type", new { input.Name, input.Code });
            return layouts.ToList();
        }

        public async Task<LayoutDto> GetDetailAsync(int input)
        {
            var layout = await _layoutRepository
                .GetAll()
                .Where(x => x.Id == input)
                .FirstOrDefaultAsync();
            return layout.MapTo<LayoutDto>();
        }

        public async Task UpdateAsync(LayoutDto input)
        {
            var layout = await _layoutRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, layout);
        }

        public async Task<int> CreateAsync(CreateLayoutDto input)
        {
            var layout = ObjectMapper.Map<Layout>(input);
            var rs = await _layoutRepository.InsertAndGetIdAsync(layout);
            return rs;
        }

        public async Task DeleteAsync(int input)
        {
            await _layoutRepository.DeleteAsync(input);
        }

        public async Task SaveLayoutAsync(SaveLayoutConfig input)
        {
            var layoutConfig = ObjectMapper.Map<LayoutConfig>(input);
            await _layoutConfigRepository.InsertAsync(layoutConfig);
        }

        public async Task ResetLayoutAsync(int input)
        {
            await _layoutConfigRepository.DeleteAsync(p => p.LayoutId == input);
        }

        public async Task<List<LayoutConfigDto>> GetListLayoutConfigAsync(int input)
        {
            var layoutConfigs = await _layoutConfigRepository
                .GetAll()
                .Where(x => x.LayoutId == input).ToListAsync();

            return ObjectMapper.Map<List<LayoutConfigDto>>(layoutConfigs);
        }
    }
}
