using Abp.Application.Services;
using HinnovaAbp.Layouts.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HinnovaAbp.Layouts
{
    public interface ILayoutAppService : IApplicationService
    {
        Task<List<LayoutDto>> GetListWithParamAsync(GetListLayoutInput input);

        Task<List<LayoutDto>> GetListAsync();

        Task<LayoutDto> GetDetailAsync(int input);

        Task<int> CreateAsync(CreateLayoutDto input);

        Task UpdateAsync(LayoutDto input);

        Task DeleteAsync(int input);

        Task SaveLayoutAsync(SaveLayoutConfig input);

        Task ResetLayoutAsync(int input);

        Task<List<LayoutConfigDto>> GetListLayoutConfigAsync(int input);
    }
}
