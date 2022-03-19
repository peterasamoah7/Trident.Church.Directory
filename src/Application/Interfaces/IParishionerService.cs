using Core.Models;
using Core.Pagination;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IParishionerService
    {
        /// <summary>
        /// CreateParishioner
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task<ParishionerViewModel> CreateParishioner(ParishionerViewModel viewModel);

        /// <summary>
        /// UpdateParishioner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task<ParishionerViewModel> UpdateParishioner(Guid id, ParishionerViewModel viewModel);

        /// <summary>
        /// DeleteParishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteParishioner(Guid id);

        /// <summary>
        /// GetParishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ParishionerViewModel> GetParishioner(Guid id);

        /// <summary>
        /// GetAllParishioners
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(string query, int pageNumber, int pageSize);

       }
}
