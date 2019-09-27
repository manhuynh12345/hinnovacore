using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HinnovaAbp.Entities
{
    [Table("Menus")] // tên table được tạo ra ở database
    public class Menu : FullAuditedEntity<int> // base class của hệ thống, có sẵn các properties common như Id, CreateDate, CreateUser, IsDelete
    {
        
        [Required] // validate not null
        [StringLength(1024, MinimumLength = 5)] // validate độ dài kí tự
        public string Name { get; set; }

        [StringLength(2048)]
        public string Description { get; set; }

        [Required]
        public int Index { get; set; }
        [Required]
        public string Type { get; set; }

        [Required]
        public bool IsDelimiter { get; set; }

        [Required]
        [StringLength(1024, MinimumLength = 5)]
        public string Title { get; set; }

        [StringLength(256)]
        public string Icon { get; set; }

        [StringLength(1024)]
        public string Link { get; set; }

        public int? Parent { get; set; }

        public bool IsParent { get; set; }

        [StringLength(256)]
        public string RequiredPermissionName { get; set; }

        /// <summary>
        /// We don't make constructor public and forcing to create events using <see cref="Create"/> method.
        /// But constructor can not be private since it's used by EntityFramework.
        /// Thats why we did it protected.
        /// </summary>
        protected Menu()
        {

        }

        public static Menu Create(string name, string type, string title, string link, int? parent, string requiredPermissionName, string description = null, int index = 0, string icon = null, bool isDelimiter = false, bool isParent = false)
        {
            var @menu = new Menu
            {
                Name = name,
                Type = type,
                Title = title,
                Description = description,
                Index = index,
                Icon = icon,
                IsDelimiter = isDelimiter,
                IsParent = isParent,
                Link = link,
                Parent = parent,
                RequiredPermissionName = requiredPermissionName
            };

            return @menu;
        }

    }
}
