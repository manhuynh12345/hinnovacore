using System;
using System.Collections.Generic;

namespace HinnovaAbp.Menus.Dto
{
    public class MenuDisplayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PermissionName { get; set; }
        public string Icon { get; set; }
        public string Route { get; set; }
        public List<MenuDisplayDto> Items { get; set; } = new List<MenuDisplayDto>();

    }
}