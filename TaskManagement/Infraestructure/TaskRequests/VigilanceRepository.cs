using LAPR5.Domain.TaskRequests;
using LAPR5.Infrastructure;
using LAPR5.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace LAPR5.Infraestructure.TaskRequests
{
    public class VigilanceRepository : BaseRepository<VigilanceTask, VigilanceId>, IVigilanceTaskRepository
    {
        public VigilanceRepository(LAPR5DbContext context):base(context.VigilanceTask)
        {
        }

        public async Task<List<VigilanceTask>> GetAllTasksUnapproved()
        {
            return await _objs.Where(t => t.Status==Status.WAITING).ToListAsync();
        }
        public async Task<List<VigilanceTask>> GetTasksByUser(string user)
        {
            return await _objs.Where(t => t.UserId.Equals(user)).ToListAsync();
        }
    }
}