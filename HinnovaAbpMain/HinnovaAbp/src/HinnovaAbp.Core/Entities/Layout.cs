using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("Layouts")] //tên table được tạo ra ở database
    public class Layout  : Entity<int>
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public long LayoutId { get; set; }

        [Required]
        [StringLength(1024)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        public int Row { get; set; }

        public bool IsParent { get; set; }

        [StringLength(50)]
        public string ParentCode { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        protected Layout()
        {
        }

        public static Layout Create(string name, string code, int row, bool isParent = false, string parentCode = null, bool isActive = true, bool isDelete = false)
        {
            var @layout = new Layout
            {
                Name = name,
                Code = code,
                Row = row,
                IsParent = isParent,
                ParentCode = parentCode,
                IsActive = isActive,
                IsDelete = isDelete
            };

            return @layout;
        }
    }
}