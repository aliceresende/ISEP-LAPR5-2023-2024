using Microsoft.EntityFrameworkCore;
using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;

namespace LAPR5.Infrastructure
{
    public class LAPR5DbContext : DbContext
    {
        public DbSet<PickUpDeliveryTask> PickUpDeliveryTask { get; set; }
        
        public DbSet<VigilanceTask> VigilanceTask { get; set; }

        public LAPR5DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PickUpDeliveryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VigilanceEntityTypeConfiguration());
        }
    }
}