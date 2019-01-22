using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IRoomsRepository
    {
        Task<Result> AddAsync(Room room);
        Task<List<Room>> GetRoomsAsync();
        Task<String> GetNameByIDAsync(Guid ID);
    }
}