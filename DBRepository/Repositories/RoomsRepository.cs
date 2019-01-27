using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class RoomsRepository : BaseRepository, IRoomsRepository
    {
        public RoomsRepository(string connectionString, IRepositoryContextFactory contextFactory) :
        base(connectionString, contextFactory)
        { }

        public async Task<List<Room>> GetRoomsAsync()
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Rooms.ToListAsync();
            }
        }

        public async Task<Result> AddAsync(Room room)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                try
                {
                    await context.Rooms.AddAsync(room);
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
                return await context.Rooms
                    .Where(g => g.ID == ID)
                    .Select(n => n.Name)
                    .SingleOrDefaultAsync();
            }
        }
    }
}