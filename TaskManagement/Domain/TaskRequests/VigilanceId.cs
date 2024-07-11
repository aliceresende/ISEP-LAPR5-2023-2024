using System;
using LAPR5.Domain.Shared;
using Newtonsoft.Json;

namespace LAPR5.Domain.TaskRequests
{
    public class VigilanceId : EntityId
    {
        [JsonConstructor]
        public VigilanceId(Guid value) : base(value)
        {
        }

        public VigilanceId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}