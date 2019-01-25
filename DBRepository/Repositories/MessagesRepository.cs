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

        public async Task<Result> AddMessageAsync(Guid roomId, Guid userId, string message)
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

                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0, data: m.Entity);
                }
            }
            catch(Exception ex){ return Utils.GetResult(ex: ex); }
        }

        public async Task<Result> AddFileAsync(IFormFile file, Guid userID)
        {
            try
            {
                var userPath = Path.Combine(FilePath, userID.ToString());

                if(!Directory.Exists(userPath))
                    Directory.CreateDirectory(userPath);

                var path = Path.Combine(userPath, file.FileName);
                using (System.IO.Stream stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Utils.GetResult(System.IO.File.Exists(path), data: path);
            }
            catch(Exception ex){ return Utils.GetResult(ex: ex); }
        }
    }
}