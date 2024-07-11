using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using LAPR5.Domain.Shared;

namespace LAPR5.Infrastructure.Shared
{
    public class EntityIdValueConverter<TTypedIdValue> : ValueConverter<TTypedIdValue, String>
        where TTypedIdValue : EntityId
    {
        public EntityIdValueConverter(ConverterMappingHints mappingHints = null) 
            : base(id => id.Value, value => Create(value), mappingHints)
        {
        }

        private static TTypedIdValue Create(String id) => Activator.CreateInstance(typeof(TTypedIdValue), id) as TTypedIdValue;
    }
}