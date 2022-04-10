using Core.Models;
using Core.Pagination;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISacramentService
    {
        /// <summary>
        /// Get Default Sacraments
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<SacramentType>> GetDefaultSacraments();

        // <summary>
        /// CreateSacrament
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task CreateSacrament(Guid id, Guid parish, CreateSacramentModel sacrament);

        /// <summary>
        /// UpdateSacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task UpdateSacrament(Guid id, UpdateSacramentModel viewModel);

        /// <summary>
        /// DeleteSacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteSacrament(Guid id);

        /// <summary>
        /// GetSacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<SacramentViewModel> GetSacrament(Guid id);

        /// <summary>
        /// GetAllSacraments
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<IEnumerable<SacramentMetric>> GetAllSacraments(Guid parish, int pageNumber, int pageSize);


        /// <summary>
        /// GetAll parishioners by SacramemtType
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(SacramentType type, Guid parish, int pageNumber, int pageSize);
    }
}
