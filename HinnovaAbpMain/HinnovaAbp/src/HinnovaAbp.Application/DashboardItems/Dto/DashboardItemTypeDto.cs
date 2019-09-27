using Abp.AutoMapper;
using HinnovaAbp.Entities;

namespace HinnovaAbp.DashboardItems.Dto
{
    [AutoMap(typeof(DashboardItemType))]
    public class DashboardItemTypeDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }
    }
}
