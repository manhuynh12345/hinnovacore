using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DashboardDetail")]
    public class DashboardDetail : Entity<int>
    {
        public string ContentId { get; set; }
        public int DashboardId { get; set; }
        public string ItemCode { get; set; }
        protected DashboardDetail() { }

        public static DashboardDetail Create(string contentId, int dashboardId, string itemCode)
        {
            var @dashboardDetail = new DashboardDetail
            {
                ContentId = contentId,
                DashboardId = dashboardId,
                ItemCode = itemCode
            };

            return @dashboardDetail;
        }
    }
}
