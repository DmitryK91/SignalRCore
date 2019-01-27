using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
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
    
        public async Task<List<ViewMessage>> GetMessages(Guid roomID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Messages
                                        .Where(g => g.RoomID == roomID)
                                        .Include(u => u.User)
                                        .Include(f => f.Files)
                                        .Select(m => new ViewMessage
                                        {
                                            ID = m.ID,
                                            PostedAt = m.PostedAt,
                                            Content = m.Content,
                                            UserName = m.User.Name,
                                            Files = m.Files.Select(f => new FileView
                                            {
                                                ID = f.ID,
                                                Name = f.Name
                                            }).ToList()
                                        })
                                        .OrderBy(c => c.PostedAt)
                                        .ToListAsync();
            }
        }

        public async Task<Result> AddMessageAsync(Guid roomId, Guid userId, string message, string fileID)
        {
            try
            {
                using (var context = ContextFactory.CreateDbContext(ConnectionString))
                {
                    var m = context.Entry(new Message
                    {
                        PostedAt = DateTime.Now,
                        RoomID = roomId,
                        UserID = userId,
                        Content = message 
                    });

                    m.State = EntityState.Added;

                    var fID = Guid.Empty;

                    if (Guid.TryParse(fileID, out fID))
                        m.Entity.Files.Add(
                            await context.Files.Where(f => f.ID == fID).SingleOrDefaultAsync());

                    var result = await context.SaveChangesAsync();

                    return Utils.GetResult(result > 0, data: m.Entity);
                }
            }
            catch (Exception ex) { return Utils.GetResult(ex: ex); }
        }

        public async Task<Result> AddFileAsync(IFormFile file, Guid userID)
        {
            try
            {
                var userPath = Path.Combine(FilePath, userID.ToString());

                if (!Directory.Exists(userPath))
                    Directory.CreateDirectory(userPath);

                var path = Path.Combine(userPath, Guid.NewGuid().ToString());
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                using (var context = ContextFactory.CreateDbContext(ConnectionString))
                {
                    var m = context.Files.Add(new Models.File
                    {
                        Path = path,
                        Name = file.FileName
                    });                    

                    var result = await context.SaveChangesAsync();
                    
                    return Utils.GetResult(System.IO.File.Exists(Path.Combine(Environment.CurrentDirectory, path)), 
                        data: m.Entity.ID);
                }
            }
            catch (Exception ex) { return Utils.GetResult(ex: ex); }
        }

        public async Task<Models.File> GetFileAsync(Guid fileID)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Files.Where(f => f.ID == fileID)
                    .SingleOrDefaultAsync();
            }
        }
    }
}