using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using HinnovaAbp.Configuration;
using HinnovaAbp.Web;

namespace HinnovaAbp.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class HinnovaAbpDbContextFactory : IDesignTimeDbContextFactory<HinnovaAbpDbContext>
    {
        public HinnovaAbpDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<HinnovaAbpDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            HinnovaAbpDbContextConfigurer.Configure(builder, configuration.GetConnectionString(HinnovaAbpConsts.ConnectionStringName));

            return new HinnovaAbpDbContext(builder.Options);
        }
    }
}
