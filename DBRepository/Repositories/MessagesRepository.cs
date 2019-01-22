using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class MessagesRepository : BaseRepository, IMessagesRepository
    {
        public MessagesRepository(string connectionString, IRepositoryContextFactory contextFactory) :
            base(connectionString, contextFactory)
        { }

        public async Task<List<ViewMessage>> GetMessages(Guid GroupID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Messages
                                        .Where(g => g.GroupID == GroupID)
                                        .Include(u => u.User)
                                        .Select(m => new ViewMessage{
                                            PostedAt = m.PostedAt,
                                            Content = m.Content,
                                            UserName = m.User.Name
                                        })
                                        .ToListAsync();
            }
        }

        public async Task<Result> AddMessageAsync(Message message)
        {
            try
            {
                using(var context = ContextFactory.CreateDbContext(ConnectionString))
                {
                    await context.Messages.AddAsync(message);
                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0);
                }
            }
            catch(Exception ex){ return Utils.GetResult(ex: ex); }
        }
    }
}