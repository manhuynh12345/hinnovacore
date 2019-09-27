using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using HinnovaAbp.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HinnovaAbp.DynamicReportLookups.Dto
{
    [AutoMapFrom(typeof(DynamicReportLookup))]
    public class DynamicReportLookupListDto : FullAuditedEntity<int>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
    }
}
