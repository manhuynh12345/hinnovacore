using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HinnovaAbp.Entities
{
    [Table("ModuleMapDashboards")]
    public class ModuleMapDashboard : Entity<int>
    {
        public int ModuleId { get; set; }
        public int DashboardId { get; set; }

        public static ModuleMapDashboard Create(int moduleId, int dashboardId)
        {
            var @moduleMapDashboard = new ModuleMapDashboard
            {
                ModuleId = moduleId,
                DashboardId = dashboardId
            };

            return @moduleMapDashboard;
        }
    }
}
