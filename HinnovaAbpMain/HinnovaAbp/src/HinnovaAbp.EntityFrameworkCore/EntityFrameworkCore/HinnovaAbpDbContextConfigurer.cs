using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace HinnovaAbp.EntityFrameworkCore
{
    public static class HinnovaAbpDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<HinnovaAbpDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<HinnovaAbpDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
