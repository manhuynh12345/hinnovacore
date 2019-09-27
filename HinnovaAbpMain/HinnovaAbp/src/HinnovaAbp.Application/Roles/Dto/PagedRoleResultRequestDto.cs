using Abp.Application.Services.Dto;

namespace HinnovaAbp.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

