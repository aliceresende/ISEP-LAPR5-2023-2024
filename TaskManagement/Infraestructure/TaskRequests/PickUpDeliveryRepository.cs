using LAPR5.Domain.TaskRequests;
using LAPR5.Infrastructure;
using LAPR5.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace LAPR5.Infraestructure.TaskRequests
{
    public class PickUpDeliveryRepository : BaseRepository<PickUpDeliveryTask, PickUpDeliveryId>, IPickUpDeliveryTaskRepository
    {
        public PickUpDeliveryRepository(LAPR5DbContext context):base(context.PickUpDeliveryTask)
        {
        }

        public async Task<List<PickUpDeliveryTask>> GetAllTasksUnapproved()
        {
            return await _objs.Where(t => t.Status==Status.WAITING).ToListAsync();
        }
        
        
        public async Task<List<PickUpDeliveryTask>> GetTasksByUser(string user)
        {
            return await _objs.Where(t => t.UserId.Equals(user)).ToListAsync();
        }
        
    }
}