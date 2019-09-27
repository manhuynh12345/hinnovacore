using Abp.Application.Services;
using HinnovaAbp.DynamicReportLookups.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HinnovaAbp.DynamicReportLookups
{
    public interface IDynamicReportLookupService : IApplicationService
    {
        Task<List<DynamicReportLookupListDto>> GetListAsync(GetDynamicReportLookupListDto input);

        Task CreateAsync(CreateDynamicReportLookupDto input);

        Task UpdateAsync(DynamicReportLookupDto input);

        Task DeleteAsync(int input);
    }
}
