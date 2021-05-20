using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BookingAPI.Infra
{
    public partial interface IRepository<T> where T : class, IEntityBase
    {
        DbContext Context { get; }
        IQueryable<T> Query();
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        IDbContextTransaction BeginTransaction();
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}