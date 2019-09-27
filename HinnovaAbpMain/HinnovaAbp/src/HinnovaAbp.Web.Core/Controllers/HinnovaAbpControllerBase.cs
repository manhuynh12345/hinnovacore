using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HinnovaAbp.Controllers
{
    public abstract class HinnovaAbpControllerBase: AbpController
    {
        protected HinnovaAbpControllerBase()
        {
            LocalizationSourceName = HinnovaAbpConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
