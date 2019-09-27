using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HinnovaAbp.Configuration;

namespace HinnovaAbp.Web.Host.Startup
{
    [DependsOn(
       typeof(HinnovaAbpWebCoreModule))]
    public class HinnovaAbpWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public HinnovaAbpWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HinnovaAbpWebHostModule).GetAssembly());
        }
    }
}
