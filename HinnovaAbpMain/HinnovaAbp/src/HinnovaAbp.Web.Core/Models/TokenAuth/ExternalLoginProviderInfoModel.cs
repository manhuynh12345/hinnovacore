using Abp.AutoMapper;
using HinnovaAbp.Authentication.External;

namespace HinnovaAbp.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
