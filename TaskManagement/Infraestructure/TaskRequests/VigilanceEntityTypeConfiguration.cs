using LAPR5.Domain.TaskRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LAPR5.Infraestructure.TaskRequests
{
    internal class VigilanceEntityTypeConfiguration : IEntityTypeConfiguration<VigilanceTask>
    {
        public void Configure(EntityTypeBuilder<VigilanceTask> builder)
        {
            builder.HasKey(b => b.Id);
               builder.Property(b => b.Id).HasConversion(
                         id => id.AsGuid(), // Convert to Guid when saving to DB
                       guid => new VigilanceId(guid) // Convert back to PickUpDeliveryId when reading from DB
                    );
        }
    }
}