﻿using System;
using System.Collections.Generic;
using System.Text;

namespace HinnovaAbp.Entities
{
    public class Parameter
    {
        public string Varible { get; set; }

        public object Value { get; set; }

        public Parameter(string varible, object value)
        {
            this.Varible = varible;
            this.Value = value;
        }
    }
}
