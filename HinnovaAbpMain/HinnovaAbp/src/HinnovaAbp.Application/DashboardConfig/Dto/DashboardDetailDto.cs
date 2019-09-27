using Abp.AutoMapper;
using Abp.Domain.Entities;
using HinnovaAbp.Entities;

namespace HinnovaAbp.DashboardConfig.Dto
{
    [AutoMap(typeof(DashboardDetail))]
    public class DashboardDetailDto : Entity<int>
    {
        public string ContentId { get; set; }
        public int DashboardId { get; set; }
        public string ItemCode { get; set; }
    }
}
