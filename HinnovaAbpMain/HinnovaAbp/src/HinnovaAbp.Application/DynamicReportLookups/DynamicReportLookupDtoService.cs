using Abp.Authorization;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using HinnovaAbp.Authorization;
using HinnovaAbp.DynamicReportLookups.Dto;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using System.Linq;

namespace HinnovaAbp.DynamicReportLookups
{
    [AbpAuthorize(PermissionNames.Pages_DynamicReportLookup)]
    public class DynamicReportLookupDtoService : HinnovaAbpAppServiceBase, IDynamicReportLookupService
    {
        private readonly IRepository<DynamicReportLookup, int> _dynamicReportLookupRepository;
        private readonly IDapperRepository<DynamicReportLookup, int> _dynamicReportLookupDapperRepository;

        public DynamicReportLookupDtoService(IRepository<DynamicReportLookup, int> dynamicReportLookupRepository , IDapperRepository<DynamicReportLookup, int> dynamicReportLookupDapperRepository)
        {
            _dynamicReportLookupRepository = dynamicReportLookupRepository;
            _dynamicReportLookupDapperRepository = dynamicReportLookupDapperRepository;
        }
        public async Task CreateAsync(CreateDynamicReportLookupDto input)
        {
            var dynamicReportLookup = ObjectMapper.Map<DynamicReportLookup>(input);
            await _dynamicReportLookupRepository.InsertAsync(dynamicReportLookup);
        }

        public async Task DeleteAsync(int input)
        {
            await _dynamicReportLookupRepository.DeleteAsync(input);
            
        }

        public async Task<List<DynamicReportLookupListDto>> GetListAsync(GetDynamicReportLookupListDto input)
        {
            var lookup = await _dynamicReportLookupDapperRepository.QueryAsync<DynamicReportLookupListDto>("DynamicReportLookup_search @Name", new { input.name });
            return lookup.ToList();
        }

        public async Task UpdateAsync(DynamicReportLookupDto input)
        {
            var dynamicReportLookup = await _dynamicReportLookupRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, dynamicReportLookup);
        }
    }
}
