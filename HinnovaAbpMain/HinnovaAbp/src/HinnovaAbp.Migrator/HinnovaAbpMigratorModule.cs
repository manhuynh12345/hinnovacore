using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HinnovaAbp.Configuration;
using HinnovaAbp.EntityFrameworkCore;
using HinnovaAbp.Migrator.DependencyInjection;

namespace HinnovaAbp.Migrator
{
    [DependsOn(typeof(HinnovaAbpEntityFrameworkModule))]
    public class HinnovaAbpMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public HinnovaAbpMigratorModule(HinnovaAbpEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(HinnovaAbpMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                HinnovaAbpConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HinnovaAbpMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
