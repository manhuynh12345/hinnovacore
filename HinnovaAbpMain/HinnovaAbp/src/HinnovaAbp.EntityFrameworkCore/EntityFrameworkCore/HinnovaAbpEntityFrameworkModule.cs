using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using HinnovaAbp.EntityFrameworkCore.Seed;

namespace HinnovaAbp.EntityFrameworkCore
{
    [DependsOn(
        typeof(HinnovaAbpCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule)
        )]
    public class HinnovaAbpEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<HinnovaAbpDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        HinnovaAbpDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        HinnovaAbpDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HinnovaAbpEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
