using System;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DynamicReportLookup")]
    public class DynamicReportLookup : FullAuditedEntity<int>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate {get; set;}
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }

        protected DynamicReportLookup()
        {

        }

        public static DynamicReportLookup Create(int id, string name, string code, bool isactive, bool isdelete, DateTime createddate, int createdby, DateTime modifieddate, int modifiedby)
        {
            var @looup = new DynamicReportLookup
            {
                Name = name,
                Code = code,
                Id = id,
                IsActive = isactive,
                IsDeleted = isdelete,
                CreatedDate = createddate,
                CreatedBy = createdby,
                ModifiedDate = modifieddate,
                ModifiedBy = modifiedby,

            };
            return looup;
        }

    }
}
