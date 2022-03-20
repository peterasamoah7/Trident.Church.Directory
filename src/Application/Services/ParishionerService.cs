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
    public class ParishionerService : IParishionerService
    {
        private readonly ChurchContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IAuditService _auditService;

        public ParishionerService(ChurchContext dbContext, IMapper mapper, IAuditService auditService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _auditService = auditService;
        }

        /// <summary>
        /// Create a parishioner
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task<ParishionerViewModel> CreateParishioner(ParishionerViewModel viewModel)
        {
            var parishioner = _mapper.Map<Parishioner>(viewModel);

            await _dbContext.Parishioners.AddAsync(parishioner);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Created, $" Member {viewModel.ToString()}  Added");
            viewModel.Id = parishioner.Id;
            return viewModel;
        }

        /// <summary>
        /// Updat a parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task<ParishionerViewModel> UpdateParishioner(Guid id, ParishionerViewModel viewModel)
        {
            var parishioner = await _dbContext.Parishioners.FirstOrDefaultAsync(x => x.Id == id);

            if (parishioner == null)
            {
                return null;
            }

            _mapper.Map(viewModel, parishioner);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Updated, $"{viewModel.ToString()} Details Updated");
            return viewModel;
        }

        /// <summary>
        /// Delete a Parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteParishioner(Guid id)
        {
            var parishioner = await _dbContext.Parishioners.FirstOrDefaultAsync(x => x.Id == id);

            if (parishioner == null)
            {
                return;
            }

            _dbContext.Remove(parishioner);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Deleted, "Member Deleted");
        }

        /// <summary>
        /// Get a Parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ParishionerViewModel> GetParishioner(Guid id)
        {
            var parishioner = await _dbContext.Parishioners
                .Include(x => x.Sacraments)
                    .ThenInclude(x => x.Parish)
                .Include(x => x.ParishGroups)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (parishioner == null)
            {
                return null;
            }

            var father = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == parishioner.FatherId);

            var mother = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == parishioner.MotherId);

            var partner = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == parishioner.Partner);

            var viewModel = _mapper.Map<ParishionerViewModel>(parishioner);
            viewModel.Father = father != null ? _mapper.Map<ParishionerViewModel>(father) : null;
            viewModel.Mother = mother != null ? _mapper.Map<ParishionerViewModel>(mother) : null;
            viewModel.Partner = partner != null ? _mapper.Map<ParishionerViewModel>(partner) : null;

            viewModel.Sacraments = parishioner.Sacraments
                .Select(x => _mapper.Map<SacramentViewModel>(parishioner.Sacraments))
                .ToList();

            viewModel.ParishGroups = parishioner.ParishGroups
                .Select(x => _mapper.Map<ParishGroupViewModel>(x))
                .ToList();

            return viewModel;
        }

        /// <summary>
        /// Get all parishioners
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishioners(
             string query, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var parishionerQuery = _dbContext.Parishioners.AsQueryable();
            if (!string.IsNullOrEmpty(query))
            {
                parishionerQuery.Where(x => x.LastName
                    .Contains(query, StringComparison.OrdinalIgnoreCase));
            }
            var parishioners = await _dbContext.Parishioners
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                 .Select(x => _mapper.Map<ParishionerViewModel>(x))
                .ToListAsync();

            var count = await parishionerQuery.CountAsync();

            return new PageResult<IEnumerable<ParishionerViewModel>>
                (parishioners, request.PageNumber, request.PageSize, count);
        }



    }
}
