using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using HinnovaAbp.Entities;
using HinnovaAbp.Menus.Dto;
using HinnovaAbp.Roles.Dto;
using HinnovaAbp.SharedDtos;

namespace HinnovaAbp.DynamicField
{
    public interface IDynamicFieldAppService : IApplicationService
    {
        Task<List<DynamicFieldListDto>> GetDynamicFields(GetDynamicFieldListInput input);
        Task InsertUpdateDynamicFields(List<DynamicValue> input);
    }
}
