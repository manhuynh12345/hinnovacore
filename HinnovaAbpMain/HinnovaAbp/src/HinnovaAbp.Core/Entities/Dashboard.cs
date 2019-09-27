using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("Dashboard")]
    public class Dashboard : Entity<int>
    {
        public string Name { get; set; }
        public int LayoutId { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }
        public bool isPublish { get; set; }
        public long? UserCreated { get; set; }
        protected Dashboard() { }

        public static Dashboard Create(string name, int layoutId, long? createUser, bool isActive = true
				, bool isDelete = false, bool isPublish = true)
        {
            var @dashboard = new Dashboard
            {
                Name = name,
                LayoutId = layoutId,
                UserCreated = createUser,
                isActive = isActive,
                isDelete = isDelete,
                isPublish = isPublish
            };

            return @dashboard;
        }
    }
}
