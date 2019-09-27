using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("StoreDatasource")] // tên table được tạo ra ở database
    public class StoreDatasource : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {        
        public int DynamicDatasourceId { get; set; }

        public string NameStore { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }
        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected StoreDatasource()
        {

        }

        public static StoreDatasource Create(int dynamicDatasourceId, string nameStore, string key, string value)
        {
            var @storeDatasource = new StoreDatasource
            {
                DynamicDatasourceId = dynamicDatasourceId,
                NameStore = nameStore,
                Key = key,
                Value = value
            };

            return @storeDatasource;
        }

    }
}
