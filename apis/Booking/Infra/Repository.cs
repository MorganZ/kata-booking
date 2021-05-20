using System.Linq;
using System.Threading.Tasks;
using BookingAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BookingAPI.Infra
{
    public partial class Repository<T> : IRepository<T> where T : class, IEntityBase, new()
    {
        public Repository(BookingContext context)
        {
            Context = context;

            DbSet = Context.Set<T>();
        }

        public DbContext Context { get; }

        protected DbSet<T> DbSet { get; }

        public IQueryable<T> Query() => DbSet;

        public void Add(T entity) => DbSet.Add(entity);

        public void Update(T entity) => Context.Entry(entity).State = EntityState.Modified;

        public void Remove(T entity) => DbSet.Remove(entity);

        public IDbContextTransaction BeginTransaction() => Context.Database.BeginTransaction();

        public int SaveChanges() => Context.SaveChanges();

        public Task<int> SaveChangesAsync() => Context.SaveChangesAsync();
    }
}