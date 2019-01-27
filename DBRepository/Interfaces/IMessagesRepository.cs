using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Models;

namespace DBRepository.Interfaces
{
    public interface IMessagesRepository
    {
        /// <summary>
        /// get messages by room id
        /// </summary>
        /// <param name="roomID"></param>
        /// <returns></returns>
        Task<List<ViewMessage>> GetMessages(Guid roomID);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="userId"></param>
        /// <param name="message"></param>
        /// <param name="fileID"></param>
        /// <returns></returns>
        Task<Result> AddMessageAsync(Guid roomId, Guid userId, string message, string fileID);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        Task<Result> AddFileAsync(IFormFile file, Guid userID);

        /// <summary>
        /// Get File by ID
        /// </summary>
        /// <param name="fileID"></param>
        /// <returns></returns>
        Task<File> GetFileAsync(Guid fileID);
    }
}