using HinnovaAbp.DashboardConfig.Dto;
using HinnovaAbp.Layouts.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.Dashboards.Dto
{
    public class PrivateDashboardLayoutDto
    {
        public bool? success { get; set; }
        public List<DashboardDetailDto> dashboard { get; set; }
        public List<LayoutConfigDto> layout { get; set; }
        public string code { get; set; }
        public int layoutId { get; set; }

        public PrivateDashboardLayoutDto()
        {
            this.success = false;
            this.dashboard = new List<DashboardDetailDto>();
            this.layout = new List<LayoutConfigDto>();
            this.code = "";
            this.layoutId = -1;
        }

        public PrivateDashboardLayoutDto(List<DashboardDetailDto> _dashboard, List<LayoutConfigDto> _layout, string _code, int _layoutId, bool? _success = false)
        {
            this.success = _success;
            this.dashboard = _dashboard;
            this.layout = _layout;
            this.code = _code;
            this.layoutId = _layoutId;
        }
    }
}
