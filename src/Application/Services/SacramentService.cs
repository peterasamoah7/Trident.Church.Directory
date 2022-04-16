using Application.Interfaces;
using Core.MappingProfile;
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
        private readonly IAuditService _auditService;
        public SacramentService(ChurchContext dbContext, IAuditService auditService)
        {
            _dbContext = dbContext;
            _auditService = auditService;
        }

        public async Task<IEnumerable<SacramentType>> GetDefaultSacraments() =>
            await Task.FromResult(Enum.GetValues(typeof(SacramentType)).Cast<SacramentType>());

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

            if (parishioner == null) return;

            var isExisting = await _dbContext.Sacraments
                .AnyAsync(x => x.Id == parishioner.Id && x.Type == sacrament.Type && x.Type != SacramentType.Reconciliation);

            if (isExisting) return;

            var sacramentEntity = new Sacrament
            {
                Type = sacrament.Type,
                ParishionerId = id,
                PriestId = sacrament.Priest,
                GodParentId = sacrament.GodParent,
                ParishId = parish
            };

            parishioner.Sacraments.Add(sacramentEntity);
            await  _dbContext.SaveChangesAsync();

            await _auditService.CreateAuditAsync(AuditType.Created, "Sacrament Created");
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
        /// Get all sacrament
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<IEnumerable<SacramentMetric>> GetAllSacraments(
            Guid parish, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var sacraments = Enum.GetValues(typeof(SacramentType))
                .Cast<SacramentType>();

            var metrics = new List<SacramentMetric>();

            foreach (var sacrament in sacraments)
            {
                var metric = await _dbContext.Sacraments
                    .CountAsync(x => x.Type == sacrament && x.ParishId == parish);

                metrics.Add(new SacramentMetric
                {
                    MemberCount = metric,
                    Type = sacrament
                });
            }
            
            return metrics;
        }

        /// <summary>
        /// get a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SacramentViewModel> GetSacrament(Guid id)
        {
            var sacrament = await _dbContext.Sacraments
                .FirstOrDefaultAsync(x => x.Id == id);

            if (sacrament == null)
            {
                return null;
            }

            var viewModel = SacramentMapping.MapDto(sacrament);

            if (sacrament.ParishId != null)
            {
                var parish = await _dbContext.Parishes
                    .FirstOrDefaultAsync(x => x.Id == sacrament.ParishId);
                if (parish != null) viewModel.Parish = ParishMapping.MapDto(parish);
            }

            if (sacrament.PriestId != null)
            {
                var parishioner = await _dbContext.Parishioners
                    .FirstOrDefaultAsync(x => x.Id == sacrament.PriestId);
                if (parishioner != null) viewModel.Priest = ParishionerMapping.MapDto(parishioner);
            }

            if (sacrament.GodParentId != null)
            {
                var parishioner = await _dbContext.Parishioners
                    .FirstOrDefaultAsync(x => x.Id == sacrament.GodParentId);
                if (parishioner != null) viewModel.Priest = ParishionerMapping.MapDto(parishioner);
            }

            return viewModel;
        }

        /// <summary>
        /// Update a sacrament 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>        
        public async Task UpdateSacrament(Guid id, UpdateSacramentModel viewModel)
        {
            var sacrament = await _dbContext.Sacraments.FirstOrDefaultAsync(x => x.Id == id);

            if (sacrament == null) return;

            sacrament.Type = viewModel.Type;
            sacrament.PriestId = viewModel.Priest;
            sacrament.GodParentId = viewModel.GodParent;

            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Updated, $"{sacrament.Type} Updated");
        }

        /// <summary>
        /// Get all Parishioners of sacrament
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(
            SacramentType type, Guid parish, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var sacraments = await _dbContext.Sacraments
                .Include(x => x.Parishioner)
                .Where(x => x.Type == type && x.ParishId == parish)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            var count = await _dbContext.Sacraments.CountAsync(x => x.Type == type);

            var parishioners = sacraments.Select(
                x => ParishionerMapping.MapDto(x.Parishioner)).ToList();

            return new PageResult<IEnumerable<ParishionerViewModel>>
                (parishioners, request.PageNumber, request.PageSize, count);
        }
    }
}
