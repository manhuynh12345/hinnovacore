using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DynamicValue")] // tên table được tạo ra ở database
    public class DynamicValue : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {        
        public int DynamicFieldId { get; set; }

        public int ObjectId { get; set; }
        //Value
        public string Key { get; set; }
        public string Value { get; set; }
        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected DynamicValue()
        {

        }

        public static DynamicValue Create(int dynamicFieldId, int objectID, int typeField, string key = null, string value = null)
        {
            var @dynamicValue = new DynamicValue
            {
                DynamicFieldId = dynamicFieldId,
                ObjectId = objectID,
                Key = key,
                Value = value             
            };

            return @dynamicValue;
        }

    }
}
