using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.DashboardItems.Dto
{
    public class DashboardItemDisplay
    {
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string TypeName { get; set; }
        public string GroupName { get; set; }
        public bool isActive { get; set; }
        public int Id { get; set; }
    }
}
