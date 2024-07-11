using LAPR5.Domain.TaskRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LAPR5.Infraestructure.TaskRequests
{
    internal class PickUpDeliveryEntityTypeConfiguration : IEntityTypeConfiguration<PickUpDeliveryTask>
    {
        public void Configure(EntityTypeBuilder<PickUpDeliveryTask> builder)
        {
            builder.HasKey(b => b.Id);
               builder.Property(b => b.Id).HasConversion(
                         id => id.AsGuid(), // Convert to Guid when saving to DB
                       guid => new PickUpDeliveryId(guid) // Convert back to PickUpDeliveryId when reading from DB
                    );
        }
    }
}