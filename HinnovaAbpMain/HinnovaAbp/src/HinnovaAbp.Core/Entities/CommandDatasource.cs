using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("CommandDatasource")] // tên table được tạo ra ở database
    public class CommandDatasource : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {        
        public int DynamicDatasourceId { get; set; }

        public string Command { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }
        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected CommandDatasource()
        {

        }

        public static CommandDatasource Create(int dynamicDatasourceId, string command, string key, string value)
        {
            var @commandDatasource = new CommandDatasource
            {
                DynamicDatasourceId = dynamicDatasourceId,
                Command = command,
                Key = key,
                Value = value
            };

            return @commandDatasource;
        }

    }
}
