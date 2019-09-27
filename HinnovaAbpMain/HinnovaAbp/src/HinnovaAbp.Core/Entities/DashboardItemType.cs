using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("DashboardItemType")]
    public class DashboardItemType : Entity<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool isActive { get; set; }
        public bool isDelete { get; set; }

        protected DashboardItemType(){}

        public static DashboardItemType Create(string name, string code, bool isActive = true, bool isDelete = false)
        {
            var @dashboardItemType = new DashboardItemType
            {
                Name = name,
                Code = code,
                isActive = isActive,
                isDelete = isDelete
            };

            return @dashboardItemType;
        }
    }
}
