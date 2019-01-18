using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Interfaces
{
    public interface IGroupsRepository
    {
        Task<Result> AddAsync(Group group);
        Task<List<Group>> GetGroupsAsync();
        Task<String> GetNameByIDAsync(Guid ID);
    }
}