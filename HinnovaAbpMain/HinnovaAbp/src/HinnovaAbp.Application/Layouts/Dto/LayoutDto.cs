using Abp.AutoMapper;
using Abp.Domain.Entities;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HinnovaAbp.Layouts.Dto
{
    [AutoMap(typeof(Layout))]
    public class LayoutDto : Entity<int>
    {

        [StringLength(1024)]
        public string Name { get; set; }
        
        [StringLength(50)]
        public string Code { get; set; }

        public int Row { get; set; }

        public bool IsParent { get; set; }

        [StringLength(50)]
        public string ParentCode { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }
    }
}
