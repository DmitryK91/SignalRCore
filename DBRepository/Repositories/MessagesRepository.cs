using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models;
using Microsoft.AspNetCore.Http;

namespace DBRepository.Repositories
{
    public class MessagesRepository : BaseRepository, IMessagesRepository
    {
        public MessagesRepository(string connectionString,
                                IRepositoryContextFactory contextFactory,
                                string filePath) :
            base(connectionString, contextFactory)
        {
            FilePath = filePath;
        }

        protected readonly string FilePath;
        public async Task<List<ViewMessage>> GetMessages(Guid RoomID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Messages
                                        .Where(g => g.RoomID == RoomID)
                                        .Include(u => u.User)
                                        .Select(m => new ViewMessage{
                                            PostedAt = m.PostedAt,
                                            Content = m.Content,
                                            UserName = m.User.Name
                                        })
                                        .ToListAsync();
            }
        }

        public async Task<Result> AddMessageAsync(Guid roomId, Guid userId, string message, IFormFileCollection uploads = null)
        {
            try
            {
                using(var context = ContextFactory.CreateDbContext(ConnectionString))
                {
                    var m = context.Entry(new Message
                    {
                        PostedAt = DateTime.Now,
                        RoomID = roomId,
                        UserID = userId,
                        Content = message
                    });
                    m.State = EntityState.Added;

                    if (uploads != null)
                        m.Entity.Files = await SaveFile(uploads, m.Entity.ID);

                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0, data: m.Entity);
                }
            }
            catch(Exception ex){ return Utils.GetResult(ex: ex); }
        }

        private async Task<List<Models.File>> SaveFile(IFormFileCollection uploads, Guid messageID)
        {
            var result = new List<Models.File>();

            foreach(var uploadedFile in uploads)
            {
                string path = Path.Combine(FilePath, uploadedFile.FileName);

                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }

                result.Add(new Models.File { Name = uploadedFile.FileName });
            }

            return result;
        }
    }
}