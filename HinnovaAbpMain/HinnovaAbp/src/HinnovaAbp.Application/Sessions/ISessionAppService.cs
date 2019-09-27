using System.Threading.Tasks;
using Abp.Application.Services;
using HinnovaAbp.Sessions.Dto;

namespace HinnovaAbp.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
