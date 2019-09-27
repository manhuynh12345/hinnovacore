using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HinnovaAbp.Entities
{
    [Table("LayoutConfigs")]    //Tên table được tạo ra ở database
    public class LayoutConfig : Entity<int>
    {
        public int ColIndex { get; set; }

        public int? ContentId { get; set; }

        public string HtmlCode { get; set; }

        public int LayoutId { get; set; }

        public int Ratio { get; set; }

        public int RowIndex { get; set; }

        public bool IsLayout { get; set; }

        protected LayoutConfig() { }

        public static LayoutConfig Create(int colIndex, int contentId, string htmlCode, int layoutId, int ratio, int rowIndex, bool isLayout = false)
        {
            var @layoutConfig = new LayoutConfig
            {
                ColIndex = colIndex,
                ContentId = contentId,
                HtmlCode = htmlCode,
                LayoutId = layoutId,
                Ratio = ratio,
                RowIndex = rowIndex,
                IsLayout = isLayout
            };

            return @layoutConfig;
        }
    }
}
