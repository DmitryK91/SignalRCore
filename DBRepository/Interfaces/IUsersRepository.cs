using System;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IUsersRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<Result> AddAsync(User user);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="userAgent"></param>
        /// <returns></returns>
        Task<User> GetUserAsync(string userName, string userAgent);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        Task<string> GetNameByIDAsync(Guid UserID);
    }
}