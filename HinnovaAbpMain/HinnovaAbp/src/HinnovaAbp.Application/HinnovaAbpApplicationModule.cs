using Abp.AutoMapper;
using Abp.Dapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using HinnovaAbp.Authorization;
using System.Collections.Generic;
using System.Reflection;

namespace HinnovaAbp
{
    [DependsOn(
        typeof(HinnovaAbpCoreModule), 
        typeof(AbpAutoMapperModule),
        typeof(AbpZeroCoreEntityFrameworkCoreModule),
        typeof(AbpDapperModule))]
    public class HinnovaAbpApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<HinnovaAbpAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(HinnovaAbpApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);
            DapperExtensions.DapperExtensions.SetMappingAssemblies(new List<Assembly>() { Assembly.GetExecutingAssembly() });
            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
