using System;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DashboardItem")]
    public class DashboardItem : Entity<int>
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


        protected DashboardItem() { }

        public static DashboardItem Create(string itemName, string itemCode, string itemType, string itemGroup, Guid? createUser, string boxHeaderIcon = null,
            string boxHeaderText = null, string boxColor = null, string boxContent = null, string boxFooterIcon = null, string boxDetailText = null,
            string boxUrl = null, string chartType = null, string chartPalette = null, string chartTitle = null, string chartArgumentField = null,
            string chartValueField = null, string chartLabelName = null, string chartStackedColumnName = null, string columnBuilder = null,
            string storeProcedure = null, bool isActive = true, bool isDelete = false)
        {
            var @dashboardItem = new DashboardItem
            {
                ItemName = itemName,
                ItemCode = itemCode,
                ItemType = itemType,
                ItemGroup = itemGroup,
                UserCreated = createUser,
                BoxHeaderIcon = boxHeaderIcon,
                BoxHeaderText = boxHeaderText,
                BoxColor = boxColor,
                BoxContent = boxContent,
                BoxFooterIcon = boxFooterIcon,
                BoxDetailText = boxDetailText,
                BoxUrl = boxUrl,
                ChartType = chartType,
                ChartPalette = chartPalette,
                ChartTitle = chartTitle,
                ChartArgumentField = chartArgumentField,
                ChartValueField = chartValueField,
                ChartLabelName = chartLabelName,
                ChartStackedColumnName = chartStackedColumnName,
                ColumnBuilder = columnBuilder,
                StoreProcedure = storeProcedure,
                isActive = isActive,
                isDelete = isDelete
            };

            return @dashboardItem;
        }
    }
}
