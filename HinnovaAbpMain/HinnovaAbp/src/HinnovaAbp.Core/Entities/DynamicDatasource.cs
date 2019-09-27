using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DynamicDatasource")] // tên table được tạo ra ở database
    public class DynamicDatasource : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {        
        public int DynamicFieldId { get; set; }

        public int ObjectId { get; set; }


        //1 -- Hard Data
        //2 -- Store
        //3 -- command
        public int Type { get; set; }
        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected DynamicDatasource()
        {

        }

        public static DynamicDatasource Create(int dynamicFieldId, int objectID, int type)
        {
            var @dynamicDatasource = new DynamicDatasource
            {
                DynamicFieldId = dynamicFieldId,
                ObjectId = objectID,
                Type = type
            };

            return @dynamicDatasource;
        }

    }
}
