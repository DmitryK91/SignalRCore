using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IRoomsRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="room"></param>
        /// <returns></returns>
        Task<Result> AddAsync(Room room);

        /// <summary>
        /// get rooms list
        /// </summary>
        /// <returns></returns>
        Task<List<Room>> GetRoomsAsync();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        Task<string> GetNameByIDAsync(Guid ID);
    }
}