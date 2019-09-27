using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using HinnovaAbp.Entities;

namespace HinnovaAbp.Menus.Dto
{
    public class GetDataSourceDynamicDto
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}