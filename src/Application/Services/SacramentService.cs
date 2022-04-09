using Application.Interfaces;
using AutoMapper;
using Core.Models;
using Core.Pagination;
using Data.Database;
using Data.Entities;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SacramentService : ISacramentService
    {
        private readonly ChurchContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAuditService _auditService;
        public SacramentService(ChurchContext dbContext, IMapper mapper, IAuditService auditService)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _auditService = auditService;
        }


        /// <summary>
        /// Create a sacrament
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task CreateSacrament(Guid id, Guid parish, CreateSacramentModel sacrament)
        {
            var parishioner = await _dbContext.Parishioners
                .Include(x => x.Sacraments)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (parishioner == null)
            {
                return;
            }

            var sacramentEntity = new Sacrament
            {
                Type = sacrament.Type,
                ParishionerId = id,
                PriestId = sacrament.Priest,
                GodParentId = sacrament.GodParent,
                ParishId = parish
            };

            parishioner.Sacraments.Add(sacramentEntity);
            _dbContext.SaveChanges();
        }

        /// <summary>
        /// Updat a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task DeleteSacrament(Guid id)
        {
            var sacrament = await _dbContext.Sacraments.FirstOrDefaultAsync(s => s.Id == id);
            if (sacrament == null)
            {
                return;
            }
            _dbContext.Sacraments.Remove(sacrament);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Deleted, "Sacrament Deleted");
        }
        /// <summary>
        /// Get all sacrament by sacrametType
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<PageResult<IEnumerable<SacramentViewModel>>> GetAllSacramentsBySacramentType(SacramentType type, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var sacrament = await _dbContext.Sacraments.Where(a => a.Type == type).Skip(request.PageNumber - 1)
                .Skip(request.PageSize).ToListAsync();

            var count = sacrament.Count();

            var viewModel = sacrament.Select(x => _mapper.Map<SacramentViewModel>(x))
                .ToList();
            return new PageResult<IEnumerable<SacramentViewModel>>
                (viewModel, request.PageNumber, request.PageSize, count);

        }

        /// <summary>
        /// Get all sacrament
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<SacramentViewModel>>> GetAllSacraments(int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var sacraments = await _dbContext.Sacraments
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                .ToListAsync();


            var count = await _dbContext.Sacraments.CountAsync();
            var viewModels = sacraments
                .Select(x => _mapper.Map<SacramentViewModel>(x))
                .ToList();

            return new PageResult<IEnumerable<SacramentViewModel>>
                (viewModels, request.PageNumber, request.PageSize, count);
        }

        /// <summary>
        /// get a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SacramentViewModel> GetSacrament(Guid id)
        {
            var sacrament = await _dbContext.Sacraments.FirstOrDefaultAsync(x => x.Id == id);
            if (sacrament == null)
            {
                return null;
            }

            var viewModel = _mapper.Map<SacramentViewModel>(sacrament);
            return viewModel;
        }

        /// <summary>
        /// Update a sacrament 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>        
        public async Task<SacramentViewModel> UpdateSacrament(Guid id, SacramentViewModel viewModel)
        {
            var sacrament = await _dbContext.Sacraments.FirstOrDefaultAsync(_dbContext => _dbContext.Id == id);
            if (sacrament == null)
            {
                return null;
            }

            _mapper.Map(viewModel, sacrament);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Updated, $"{sacrament.Type} Updated");
            return viewModel;
        }

        /// <summary>
        /// Get all Parishioners of sacrament
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishionersBySacramentType(SacramentType type, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var parishionerQuery = _dbContext.Sacraments.AsQueryable();
            var viewModels = await parishionerQuery.Where(x => x.Type == type).
                Skip(request.PageNumber - 1)
                 .Take(request.PageSize)
                 .Select(x => _mapper.Map<ParishionerViewModel>(x.Parishioner))
                 .ToListAsync();
            var count = await parishionerQuery.CountAsync();

            return new PageResult<IEnumerable<ParishionerViewModel>>
               (viewModels, request.PageNumber, request.PageSize, count);
        }
    }
}
