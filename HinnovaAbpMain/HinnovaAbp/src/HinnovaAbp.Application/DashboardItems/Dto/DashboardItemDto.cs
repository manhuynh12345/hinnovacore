using HinnovaAbp.Entities;
using Abp.AutoMapper;
using System;
using Abp.Domain.Entities;

namespace HinnovaAbp.DashboardItems.Dto
{
    [AutoMap(typeof(DashboardItem))]
    public class DashboardItemDto : Entity<int>
    {
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string ItemType { get; set; }
        public string ItemGroup { get; set; }
        public Guid? UserCreated { get; set; }

        public string BoxHeaderIcon { get; set; }
        public string BoxHeaderText { get; set; }
        public string BoxColor { get; set; }
        public string BoxContent { get; set; }
        public string BoxFooterIcon { get; set; }
        public string BoxDetailText { get; set; }
        public string BoxUrl { get; set; }


        public string ChartType { get; set; }
        public string ChartPalette { get; set; }
        public string ChartTitle { get; set; }
        public string ChartArgumentField { get; set; }
        public string ChartValueField { get; set; }
        public string ChartLabelName { get; set; }
        public string ChartStackedColumnName { get; set; }

        public string ColumnBuilder { get; set; }
        public string StoreProcedure { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }
    }
}
