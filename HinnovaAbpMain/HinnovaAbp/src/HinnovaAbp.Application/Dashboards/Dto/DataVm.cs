using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.Dashboards.Dto
{
    public class DataVm
    {
        public bool isSucceeded { get; set; }
        public object Data { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }

        public DataVm()
        {
        }

        public DataVm(string code, string message, object data)
        {
            this.Data = data;
            this.Code = code;
            this.Message = message;
        }

        public static DataVm Success(string code, string message, object data)
        {
            var rv = new DataVm(code, message, data);
            rv.isSucceeded = true;
            return rv;
        }

        public static DataVm Fail(string code, string message)
        {
            return new DataVm(code, message, null);
        }
    }
}
