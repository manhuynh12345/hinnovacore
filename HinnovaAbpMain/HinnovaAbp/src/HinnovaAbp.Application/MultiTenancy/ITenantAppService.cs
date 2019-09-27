using Abp.Application.Services;
using HinnovaAbp.MultiTenancy.Dto;

namespace HinnovaAbp.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

