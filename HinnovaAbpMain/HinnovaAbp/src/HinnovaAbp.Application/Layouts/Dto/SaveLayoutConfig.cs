using Abp.AutoMapper;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.Layouts.Dto
{
    [AutoMap(typeof(LayoutConfig))]
    public class SaveLayoutConfig
    {
        public int ColIndex { get; set; }

        public int ContentId { get; set; }

        public string HtmlCode { get; set; }

        public int LayoutId { get; set; }

        public int Ratio { get; set; }

        public int RowIndex { get; set; }

        public bool IsLayout { get; set; }
    }
}
