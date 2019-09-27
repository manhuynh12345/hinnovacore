using Abp.Authorization;
using HinnovaAbp.Authorization.Roles;
using HinnovaAbp.Authorization.Users;

namespace HinnovaAbp.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
