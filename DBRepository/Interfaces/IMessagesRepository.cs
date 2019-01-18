using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IMessagesRepository {
        Task<List<Message>> GetMessages(Guid GroupID);
        Task<Result> AddMessageAsync (Message message);
    }
}