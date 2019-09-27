using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HinnovaAbp.Authorization.Roles;
using HinnovaAbp.Authorization.Users;
using HinnovaAbp.MultiTenancy;
using HinnovaAbp.Entities;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;
using Parameter = HinnovaAbp.Entities.Parameter;
using Abp.Configuration.Startup;
using System.Configuration;
using HinnovaAbp.Configuration;
using HinnovaAbp.Web;
using Microsoft.Extensions.Configuration;

namespace HinnovaAbp.EntityFrameworkCore
{
    public class HinnovaAbpDbContext : AbpZeroDbContext<Tenant, Role, User, HinnovaAbpDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Menu> Menus { get; set; }

        //Dynamic
        public DbSet<DynamicField> DynamicFields { get; set; }
        public DbSet<DynamicValue> DynamicValues { get; set; }
        public DbSet<DynamicDatasource> DynamicDatasources { get; set; }
        public DbSet<HardDatasource> HardDatasources { get; set; }
        public DbSet<CommandDatasource> CommandDatasources { get; set; }
        public DbSet<StoreDatasource> StoreDatasources { get; set; }

        public DbSet<Layout> Layouts { get; set; } 
        public DbSet<LayoutConfig> LayoutConfigs { get; set; }

        public DbSet<DashboardItem> DashboardItem { get; set; }
        public DbSet<DashboardItemType> DashboardItemType { get; set; }
        public DbSet<DashboardItemGroup> DashboardItemGroup { get; set; }

        public DbSet<Dashboard> Dashboard { get; set; }
        public DbSet<DashboardDetail> DashboardDetail { get; set; }

        public DbSet<ModuleMapDashboard> ModuleMapDashboards { get; set; }

        public DbSet<DynamicReportLookup> DynamicReportLookup { get; set; }


        static IConfigurationRoot configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

        public HinnovaAbpDbContext(DbContextOptions<HinnovaAbpDbContext> options)
            : base(options)
        {
        }

        public static string executeStoreProcedureMultiResults(string storeProcedure, List<Parameter> arrParam)
        {
            try
            {
                string connectionString = configuration.GetConnectionString(HinnovaAbpConsts.ConnectionStringName);
                using (var conn = new SqlConnection(connectionString))
                using (var command = new SqlCommand(storeProcedure, conn)
                { CommandType = CommandType.StoredProcedure })
                {
                    conn.Open();
                    if (arrParam != null)
                        foreach (Parameter param in arrParam)
                            command.Parameters.Add(new SqlParameter(param.Varible, param.Value));
                    IDataReader reader = command.ExecuteReader();

                    var dynamicObject = new List<List<Dictionary<string, object>>>();
                    do
                    {
                        var items = new List<Dictionary<string, object>>();
                        while (reader.Read())
                        {
                            var item = new Dictionary<string, object>(reader.FieldCount);
                            for (var i = 0; i < reader.FieldCount; i++)
                            {
                                item[reader.GetName(i)] = reader.GetValue(i);
                            }

                            items.Add(item);
                        }

                        dynamicObject.Add(items);
                        // var json = Newtonsoft.Json.JsonConvert.SerializeObject(items, Newtonsoft.Json.Formatting.Indented);
                    }
                    while (reader.NextResult());

                    reader.Close();
                    return Newtonsoft.Json.JsonConvert.SerializeObject(dynamicObject, Newtonsoft.Json.Formatting.Indented);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                Console.WriteLine(arrParam);
                throw;
            }
        }

        public static string executeStoreProcedure(string storeProcedure, List<Parameter> arrParam)
        {
            try
            {
                string connectionString = configuration.GetConnectionString(HinnovaAbpConsts.ConnectionStringName);
                using (var conn = new SqlConnection(connectionString))
                using (var command = new SqlCommand(storeProcedure, conn)
                { CommandType = CommandType.StoredProcedure })
                {
                    conn.Open();
                    if (arrParam != null)
                        foreach (Parameter param in arrParam)
                            command.Parameters.Add(new SqlParameter(param.Varible, param.Value));
                    IDataReader reader = command.ExecuteReader();

                    var items = new List<Dictionary<string, object>>();
                    while (reader.Read())
                    {
                        var item = new Dictionary<string, object>(reader.FieldCount);
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            item[reader.GetName(i)] = reader.GetValue(i);
                        }

                        items.Add(item);
                    }

                    var json = Newtonsoft.Json.JsonConvert.SerializeObject(items, Newtonsoft.Json.Formatting.Indented);

                    reader.Close();
                    return json;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                Console.WriteLine(arrParam);
                throw;
            }
        }
    }
}
