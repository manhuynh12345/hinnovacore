using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HinnovaAbp.Entities;

namespace HinnovaAbp.Menus.Dto
{
    [AutoMapFrom(typeof(Menu))]
    public class MenuDetailOutput : FullAuditedEntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Index { get; set; }
        public string Type { get; set; }
        public bool IsDelimiter { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public string Link { get; set; }
        public int? Parent { get; set; }
        public bool IsParent { get; set; }
        public string RequiredPermissionName { get; set; }
    }
}