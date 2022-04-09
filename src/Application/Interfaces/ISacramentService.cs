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

        ///create a sacrament for a parishioner
        ///edit a sacrament for a parishioner
        ///delete a sacrament for a parishioner
        ///update a sacrament for a parishioner
        ///get all sacraments
        ///get all sacraments by type
        ///get all parishioners for a sacrament type
        ///

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
        Task<SacramentViewModel> UpdateSacrament(Guid id, SacramentViewModel viewModel);

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
        Task<PageResult<IEnumerable<SacramentViewModel>>> GetAllSacraments(int pageNumber, int pageSize);


        /// <summary>
        /// GetAll Sacraments by SacramemtType
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<SacramentViewModel>>> GetAllSacramentsBySacramentType(SacramentType type, int pageNumber, int pageSize);

        /// <summary>
        /// GetAll parishioners by SacramemtType
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishionersBySacramentType(SacramentType type, int pageNumber, int pageSize);


    }
}
