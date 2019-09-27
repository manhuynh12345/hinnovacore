using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using HinnovaAbp.Entities;

namespace HinnovaAbp.DynamicReportLookups.Dto
{
    [AutoMap(typeof(HinnovaAbp.Entities.DynamicReportLookup))]
    public class DynamicReportLookupDto : FullAuditedEntity<int>
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
