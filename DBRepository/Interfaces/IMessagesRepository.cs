using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Models;

namespace DBRepository.Interfaces
{
    public interface IMessagesRepository
    {
        Task<List<ViewMessage>> GetMessages(Guid GroupID);
        Task<Result> AddMessageAsync (Guid roomId, Guid userId, string message, IFormCollection uploads = null);
    }
}