using Core.Models;
using Core.Pagination;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IParishService
    {
        /// <summary>
        /// GetParish
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ParishViewModel> GetParish(Guid id);

        /// <summary>
        /// GetAllParishs
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishViewModel>>> GetAllParishs(string query, int pageNumber, int pageSize);

        /// <summary>
        /// SearchParishs
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishionerViewModel>>> GetParishioners(Guid id, int pageNumber, int pageSize);
    }
}
