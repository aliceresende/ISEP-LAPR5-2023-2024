namespace LAPR5.Domain.Shared;


    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
