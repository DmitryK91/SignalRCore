using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class GroupsRepository : BaseRepository, IGroupsRepository
    {
        public GroupsRepository(string connectionString, IRepositoryContextFactory contextFactory) :
        base(connectionString, contextFactory)
        { }

        public async Task<List<Group>> GetGroupsAsync()
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Groups.ToListAsync();
            }
        }
        public async Task<Result> AddAsync(Group group)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    await context.Groups.AddAsync(group);
                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0);
                }
                catch (Exception ex) { return Utils.GetResult(ex: ex); }
            }
        }

        public async Task<String> GetNameByIDAsync(Guid ID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Groups
                    .Where(g => g.ID == ID)
                    .Select(n => n.Name)
                    .SingleOrDefaultAsync();
            }
        }
    }
}