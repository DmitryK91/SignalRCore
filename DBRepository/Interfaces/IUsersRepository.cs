using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IUsersRepository
    {
        Task<Result> AddAsync(User user);
        Task<Boolean> IsCorrectAsync(User user);
        Task<String> GetNameByIDAsync(Guid UserID);
    }
}