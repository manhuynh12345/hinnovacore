using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;


namespace HinnovaAbp.Entities
{
    [Table("DashboardItemGroup")]
    public class DashboardItemGroup : Entity<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }

        protected DashboardItemGroup() { }

        public static DashboardItemGroup Create(string name, string code, bool isActive = true, bool isDelete = false)
        {
            var @dashboardItemGroup = new DashboardItemGroup
            {
                Name = name,
                Code = code,
                isActive = isActive,
                isDelete = isDelete
            };

            return @dashboardItemGroup;
        }
    }
}
