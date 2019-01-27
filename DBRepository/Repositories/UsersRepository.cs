using System;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(string connectionString, IRepositoryContextFactory contextFactory) :
        base(connectionString, contextFactory)
        { }

        public async Task<Result> AddAsync(User user)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    await context.Users.AddAsync(user);
                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0);
                }
                catch (Exception ex) { return Utils.GetResult(ex: ex); }
            }
        }

        public async Task<string> GetNameByIDAsync(Guid ID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users
                    .Where(g => g.ID == ID)
                    .Select(n => n.Name)
                    .SingleOrDefaultAsync();
            }
        }

        public async Task<User> GetUserAsync(string userName, string userAgent)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.Where(
                    u => u.Name == userName && u.Agent == userAgent).SingleOrDefaultAsync();
            }
        }
    }
}