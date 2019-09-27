using Microsoft.AspNetCore.Antiforgery;
using HinnovaAbp.Controllers;

namespace HinnovaAbp.Web.Host.Controllers
{
    public class AntiForgeryController : HinnovaAbpControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
