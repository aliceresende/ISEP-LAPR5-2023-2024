
using LAPR5.Domain.Shared;

namespace LAPR5.Domain.TaskRequests
{
    public interface IPickUpDeliveryTaskRepository: IRepository<PickUpDeliveryTask, PickUpDeliveryId>
    {
        Task<List<PickUpDeliveryTask>> GetAllTasksUnapproved();
        Task<List<PickUpDeliveryTask>> GetTasksByUser(string user);
    }
}