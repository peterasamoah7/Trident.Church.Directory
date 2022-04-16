﻿using Core.Enums;
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
        Task CreateParishioner(Guid parishId, CreateParishionerModel viewModel);

        /// <summary>
        /// UpdateParishioner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task UpdateParishioner(Guid id, UpdateParishionerModel viewModel);

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
        Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(Guid parishId, string query, int pageNumber, int pageSize);

        /// <summary>
        /// Add Sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sacrament"></param>
        /// <returns></returns>
        Task AddSacrament(Guid id, Guid parish, CreateSacramentModel sacrament);

        /// <summary>
        /// Add a parishioner relative
        /// </summary>
        /// <param name="id"></param>
        /// <param name="relativeId"></param>
        /// <param name="relativeType"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        Task AddRelative(Guid id, CreateRelativeModel model);
    }
}
