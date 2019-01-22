using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IMessagesRepository {
        Task<List<ViewMessage>> GetMessages(Guid GroupID);
        Task<Result> AddMessageAsync (Message message);
    }
}