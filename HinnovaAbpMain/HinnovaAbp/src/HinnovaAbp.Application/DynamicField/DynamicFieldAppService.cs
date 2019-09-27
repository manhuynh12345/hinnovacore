using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using HinnovaAbp.Entities;
using HinnovaAbp.Menus.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HinnovaAbp.DynamicField
{
    // [AbpAuthorize(PermissionNames.Pages_Menus)]
    public class DynamicFieldAppService : HinnovaAbpAppServiceBase, IDynamicFieldAppService
    {
        private readonly IRepository<DynamicValue, int> _dynamicValueRepository;
        private readonly IDapperRepository<DynamicValue, int> _dynamicFieldDapperRepository;

        public DynamicFieldAppService(IRepository<DynamicValue, int> dynamicValueRepository, IDapperRepository<DynamicValue, int> dynamicFieldDapperRepository)
        {
            _dynamicValueRepository = dynamicValueRepository;
            _dynamicFieldDapperRepository = dynamicFieldDapperRepository;
        }

        public async Task<List<DynamicFieldListDto>> GetDynamicFields(GetDynamicFieldListInput input)
        {           
            var tenantId = (AbpSession.TenantId == null) ? 1 : AbpSession.TenantId;
            var dynamicValue = await _dynamicFieldDapperRepository.QueryAsync<DynamicFieldListDto>("GetDynamicFields @Link, @TenantId, @ObjectId", new { input.Link, tenantId,input.ObjectId });
            return dynamicValue.ToList();
        }

        public async Task<List<GetDataSourceDynamicDto>> GetDataSourceDynamic(GetDataSourceDynamicInput input)
        {
            try
            {              
                var dynamicValue = await _dynamicFieldDapperRepository.QueryAsync<GetDataSourceDynamicDto>("GetDataSourceDynamic @DynamicFieldId, @ObjectId, @Parameters", new { input.DynamicFieldId, input.ObjectId, input.Parameters });
                return dynamicValue.ToList();
            }
            catch(Exception e)
            {
                return null;
            }            
        }

        public async Task InsertUpdateDynamicFields(List<DynamicValue> input)
        {
            foreach (var data in input)
            {
                if (data.Id == 0)
                {
                    var dynamicValue = ObjectMapper.Map<DynamicValue>(data);
                    await _dynamicValueRepository.InsertAsync(dynamicValue);
                }
                else
                {
                    await _dynamicValueRepository.UpdateAsync(data);           
                }
            }
        }

    }
}

