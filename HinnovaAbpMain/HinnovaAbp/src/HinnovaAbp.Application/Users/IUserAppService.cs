using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HinnovaAbp.Roles.Dto;
using HinnovaAbp.Users.Dto;

namespace HinnovaAbp.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
