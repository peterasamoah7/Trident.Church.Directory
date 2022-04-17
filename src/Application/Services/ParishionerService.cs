using Application.Interfaces;
using AutoMapper;
using Core.Enums;
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
        public async Task<ParishionerViewModel> CreateParishioner(Guid parishId, ParishionerViewModel viewModel)
        {
            var parishioner = ParishionerMapping.MapEntity(viewModel);
            parishioner.ParishId = parishId;

            await _dbContext.Parishioners.AddAsync(parishioner);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Created, $" Member {viewModel} Created");

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
            var parishioner = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == id);

            if (parishioner == null)
            {
                return null;
            }

            parishioner.PhoneNumber = viewModel.PhoneNumber;
            parishioner.DateOfBirth = viewModel.DateOfBirth;
            parishioner.Location = viewModel.Location;
            parishioner.Occupation = viewModel.Occupation;
            parishioner.Email = viewModel.Email;
            parishioner.HomeAddress = viewModel.HomeAddress;
            parishioner.FirstName = viewModel.FirstName;
            parishioner.LastName = viewModel.LastName;
            parishioner.PostCode = viewModel.PostCode;

            _dbContext.Parishioners.Update(parishioner);
            await _dbContext.SaveChangesAsync();
            await _auditService.CreateAuditAsync(AuditType.Updated, $"{viewModel} Details Updated");

            return viewModel;
        }

        /// <summary>
        /// Delete a Parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteParishioner(Guid id)
        {
            var parishioner = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == id);

            var memberDetail = $"{parishioner.FirstName} {parishioner.LastName}";

            if (parishioner == null)
            {
                return;
            }

            _dbContext.Remove(parishioner);
            await _dbContext.SaveChangesAsync();

            await _auditService.CreateAuditAsync(AuditType.Deleted, $"Member {memberDetail} Deleted");
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
                .FirstOrDefaultAsync(x => x.Id == parishioner.PartnerId);

            var viewModel = ParishionerMapping.MapDto(parishioner);
            viewModel.Father = father != null ? ParishionerMapping.MapDto(father) : null;
            viewModel.Mother = mother != null ? ParishionerMapping.MapDto(mother) : null;
            viewModel.Partner = partner != null ? ParishionerMapping.MapDto(partner) : null;

            viewModel.Sacraments = parishioner.Sacraments
                .Select(x => SacramentMapping.MapDto(x))
                .ToList();

            viewModel.ParishGroups = parishioner.ParishGroups
                .Select(x => ParishGroupMapping.MapDto(x))
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
             Guid parishId, ParishionerType type, string query, int pageNumber, int pageSize)
        {
            var pageRequest = new PageRequest(pageNumber, pageSize);

            var parishionerQuery = _dbContext.Parishioners.AsQueryable();
            if (!string.IsNullOrEmpty(query))
            {
                parishionerQuery.Where(x => x.LastName
                    .Contains(query, StringComparison.OrdinalIgnoreCase));
            }

            var parishioners = await _dbContext.Parishioners
                .Where(x => x.ParishId == parishId)
                .Where(x => x.Type == type)
                .Skip((pageRequest.PageNumber - 1) * pageRequest.PageSize)
                .Take(pageRequest.PageSize)
                .Select(x => ParishionerMapping.MapDto(x))
                .ToListAsync();

            var count = await parishionerQuery.CountAsync(x => x.ParishId == parishId);

            return new PageResult<IEnumerable<ParishionerViewModel>>
                (parishioners, pageRequest.PageNumber, pageRequest.PageSize, count);
        }

        /// <summary>
        /// Add Sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sacrament"></param>
        /// <returns></returns>
        public async Task AddSacrament(Guid id, Guid parish, CreateSacramentModel sacrament)
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
        /// Add a parishioner relative
        /// </summary>
        /// <param name="id"></param>
        /// <param name="relativeId"></param>
        /// <param name="relativeType"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public async Task AddRelative(Guid id, CreateRelativeModel model)
        {
            if(!await _dbContext.Parishioners.AnyAsync(x => x.Id == id)
                && !await _dbContext.Parishioners.AnyAsync(x => x.Id == id))
            {
                return;
            }

            var parishioner = await _dbContext.Parishioners
                .FirstOrDefaultAsync(x => x.Id == id);

            switch (model.RelativeType)
            {
                case RelativeType.Father:
                    parishioner.FatherId = model.RelativeId;
                    break;
                case RelativeType.Mother:
                    parishioner.MotherId = model.RelativeId;
                    break;
                case RelativeType.Partner:
                    parishioner.PartnerId = model.RelativeId;
                    break;
                default: 
                    throw new ArgumentOutOfRangeException(
                        nameof(model.RelativeType));
            }

            _dbContext.Parishioners.Update(parishioner);
            await _dbContext.SaveChangesAsync();
        }
    }
}
