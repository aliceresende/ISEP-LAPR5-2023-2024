using System.Threading.Tasks;
using LAPR5.Domain.Shared;

namespace LAPR5.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LAPR5DbContext _context;

        public UnitOfWork(LAPR5DbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}