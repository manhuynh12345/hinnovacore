using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DynamicField")] // tên table được tạo ra ở database
    public class DynamicField : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {        
        public int ModuleId { get; set; }

        public int TenantId { get; set; }

        //Tên bảng
        public string TableName { get; set; }
        public string Name { get; set; }

        //1 -- CheckBox
        //2 -- Text
        //3 -- Combobox
        public int TypeField { get; set; }
        public int? Width { get; set; }

        //Div hiển thị
        public string NameDescription { get; set; }
        public int? WidthDescription { get; set; }

        //class kèm theo
        public string ClassAttach { get; set; }

        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected DynamicField()
        {

        }

        public static DynamicField Create(int moduleId, int tenantId, int typeField, string tableName = null, string name = null
                                        ,int? width = 0, string nameDescription = null, int? widthDescription = 0, string classAttach = null)
        {
            var @dynamicField = new DynamicField
            {
                ModuleId = moduleId,
                TenantId = tenantId,
                TableName = tableName,
                Name = name,
                TypeField = typeField,
                Width = width,
                NameDescription = nameDescription,
                WidthDescription = widthDescription,
                ClassAttach = classAttach
            };

            return @dynamicField;
        }

    }
}
