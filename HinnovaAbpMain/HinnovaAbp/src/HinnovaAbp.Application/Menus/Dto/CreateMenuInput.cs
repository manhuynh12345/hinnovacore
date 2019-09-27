using System;
using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using HinnovaAbp.Entities;

namespace HinnovaAbp.Menus.Dto
{
    [AutoMapTo(typeof(Menu))]
    public class CreateMenuInput
    {
        
        [Required]
        [StringLength(1024, MinimumLength = 5)]
        public string Name { get; set; }

        [StringLength(2048)]
        public string Description { get; set; }

        [Required]
        public int Index { get; set; }
        [Required]
        public string Type { get; set; }

        [Required]
        public bool IsDelimiter { get; set; }

        [Required]
        [StringLength(1024, MinimumLength = 5)]
        public string Title { get; set; }

        [StringLength(256)]
        public string Icon { get; set; }

        [StringLength(1024)]
        public string Link { get; set; }

        public int? Parent { get; set; }

        public bool IsParent { get; set; }

        [StringLength(256)]
        public string RequiredPermissionName { get; set; }
    }
}
