using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace HinnovaAbp.Authorization
{
    public class HinnovaAbpAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            context.CreatePermission(PermissionNames.Pages_Menus, L("Menus"));
            context.CreatePermission(PermissionNames.Pages_Layouts, L("Layouts"));


            context.CreatePermission(PermissionNames.Pages_DynamicReportLookup, L("DynamicReportLookup"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, HinnovaAbpConsts.LocalizationSourceName);
        }
    }
}
