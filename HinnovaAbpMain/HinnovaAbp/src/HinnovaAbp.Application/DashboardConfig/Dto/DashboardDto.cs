using Abp.AutoMapper;
using Abp.Domain.Entities;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.DashboardConfig.Dto
{
    [AutoMap(typeof(Dashboard))]
    public class DashboardDto : Entity<int>
    {
        public string Name { get; set; }
        public int LayoutId { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }
        public bool isPublish { get; set; }
        public long UserCreated { get; set; }
    }
}
