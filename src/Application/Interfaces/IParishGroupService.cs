using Core.Models;
using Core.Pagination;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IParishGroupService
    {
        /// <summary>
        /// CreateParishGroup
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task<ParishGroupViewModel> CreateParishGroup(Guid parishId, ParishGroupViewModel viewModel);

        /// <summary>
        /// UpdateParishGroup
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task<ParishGroupViewModel> UpdateParishGroup(ParishGroupViewModel viewModel);

        /// <summary>
        /// DeleteParishGroup
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteParishGroup(Guid id);

        /// <summary>
        /// GetParishGroup
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ParishGroupViewModel> GetParishGroup(Guid id);

        /// <summary>
        /// GetAllParishGroups
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishGroupViewModel>>> GetAllParishGroups(Guid parishId, string query, int pageNumber, int pageSize);

        /// <summary>
        /// Add Parishioner To Group
        /// </summary>
        /// <param name="parishionerId"></param>
        /// <param name="parishGroupId"></param>
        /// <returns></returns>
        public Task AddParishionerToGroup(Guid parishionerId, Guid parishGroupId);
        
        /// <summary>
        /// Get all Parishioners of a church Group
        /// </summary>
        /// <param name="ChurchGroupId"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(Guid ChurchGroupId, int pageNumber, int pageSize);


        /// <summary>
        /// Delete a Parahioner of Ghurch Group
        /// </summary>
        /// <param name="parishionerId"></param>
        /// <param name="parishGroupId"></param>
        /// <returns></returns>
        public Task DeleteParishionerFromGroup(Guid parishionerId, Guid parishGroupId);


    }
}
