
using LAPR5.Domain.Shared;

namespace LAPR5.Domain.TaskRequests
{
    public interface IVigilanceTaskRepository: IRepository<VigilanceTask, VigilanceId>
    {
        Task<List<VigilanceTask>> GetAllTasksUnapproved();
        
        Task<List<VigilanceTask>> GetTasksByUser(string user);
        
    }
}