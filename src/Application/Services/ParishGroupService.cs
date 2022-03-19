﻿using Application.Interfaces;
using AutoMapper;
using Core.MappingProfile;
using Core.Models;
using Core.Pagination;
using Data.Database;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ParishGroupService : IParishGroupService
    {
        private readonly ChurchContext _dbContext;
        private readonly IAuditService _auditService;
        public ParishGroupService(ChurchContext dbContext, IAuditService auditService)
        {
            _dbContext = dbContext;
            _auditService = auditService;
        }

        /// <summary>
        /// Create a parish
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task<ParishGroupViewModel> CreateParishGroup(Guid parishId, ParishGroupViewModel viewModel)
        {
            var churchGroup = ParishGroupMapping.MapEntity(viewModel);
            churchGroup.ParishId = parishId;

            await _dbContext.ParishGroups.AddAsync(churchGroup);
            await _dbContext.SaveChangesAsync();

            await _auditService.CreateAuditAsync(
                AuditType.Created, $"{churchGroup.Name} Unit Added");

            viewModel.Id = churchGroup.Id;
            return viewModel;
        }

        /// <summary>
        /// Delete a parish group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteParishGroup(Guid id)
        {
            var churchGroup = await _dbContext.ParishGroups
                .FirstOrDefaultAsync(x => x.Id == id);

            if (churchGroup == null)
            {
                return;
            }

            _dbContext.ParishGroups.Remove(churchGroup);
            await _dbContext.SaveChangesAsync();

            await _auditService.CreateAuditAsync(
                AuditType.Deleted, $"{churchGroup.Name} Deleted");

        }

        /// <summary>
        /// Get parish groups
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ParishGroupViewModel>>> GetAllParishGroups(string query, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);
            var churchgroupQuery = _dbContext.ParishGroups.AsQueryable();
          
            if (!string.IsNullOrEmpty(query))
            {
                churchgroupQuery.Where(x => x.Name.Contains(query,StringComparison.OrdinalIgnoreCase));
            }

            var churchGroups = await churchgroupQuery
                .Include(x => x.Parishioners)
                .Include(x => x.Parish)
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                .ToListAsync();

            var viewModel = new List<ParishGroupViewModel>();

            foreach (var item in churchGroups)
            {
                var model = ParishGroupMapping.MapDto(item);
                model.Parish = ParishMapping.MapDto(item.Parish);
                model.MemberCount = item.Parishioners.Count;
                viewModel.Add(model);
            }

            var count = await _dbContext.ParishGroups.CountAsync();           
               
            var response = new PageResult<IEnumerable<ParishGroupViewModel>>
                (viewModel, request.PageNumber, request.PageSize, count);

            return response;
        }

        /// <summary>
        /// Get parishioners for parish groups
        /// </summary>
        /// <param name="ChurchGroupId"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ParishionerViewModel>>> GetAllParishionersByChurchGroupId(Guid ChurchGroupId, int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);
            var churchgroup = await _dbContext.ParishGroups
                .Include(x => x.Parishioners)
                .FirstOrDefaultAsync( x => x.Id == ChurchGroupId);

            if (churchgroup == null)
            {
                return null;
            }

            var parishioners = churchgroup.Parishioners
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                .Select(x => ParishionerMapping.MapDto(x)).ToList();

            var count = parishioners.Count();       

            return new PageResult<IEnumerable<ParishionerViewModel>>
                (parishioners, request.PageNumber, request.PageSize, count);
        }

        /// <summary>
        /// Get parish group and details
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ParishGroupViewModel> GetParishGroup(Guid id)
        {
            var parishGroup = await _dbContext.ParishGroups
                .Include(x => x.Parishioners)
                .Include(x => x.Parish)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (parishGroup == null)
            {
                return null;
            }

            var viewModel = ParishGroupMapping.MapDto(parishGroup);
            viewModel.Parish = ParishMapping.MapDto(parishGroup.Parish);
            viewModel.Parishioners = parishGroup.Parishioners
                .Take(20)
                .Select(x => ParishionerMapping.MapDto(x))
                .ToList();

            return viewModel;
        }

        /// <summary>
        /// Update parish group
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        public async Task<ParishGroupViewModel> UpdateParishGroup(ParishGroupViewModel viewModel)
        {
            var churchgroup = await _dbContext.ParishGroups
                .FirstOrDefaultAsync(x => x.Id == viewModel.Id);

            if (churchgroup == null)
            {
                return null;
            }

            churchgroup = ParishGroupMapping.MapEntity(viewModel);  

            _dbContext.Update(churchgroup);
            await _dbContext.SaveChangesAsync();

            await _auditService.CreateAuditAsync(
                AuditType.Updated, $"{churchgroup.Name} Details  Updated");

            return viewModel;
        }

        /// <summary>
        /// Add parishioner to group
        /// </summary>
        /// <param name="parishionerId"></param>
        /// <param name="parishGroupId"></param>
        /// <returns></returns>
        public async Task AddParishionerToGroup(Guid parishionerId, Guid parishGroupId)
        {
            var parishioner = await _dbContext.Parishioners
                .Include(x => x.ParishGroups)
                .FirstOrDefaultAsync(x => x.Id == parishionerId);

            if (parishioner == null || parishioner.ParishGroups.Any(x => x.Id == parishGroupId))
            {
                return;
            } 

            var churchGroup = await _dbContext.ParishGroups.FirstOrDefaultAsync( x => x.Id == parishGroupId);
           
            if (churchGroup == null)
            {
                return;
            }

            parishioner.ParishGroups.Add(churchGroup);
            await _dbContext.SaveChangesAsync(); 
        } 

        /// <summary>
        /// Remove parishioner from group
        /// </summary>
        /// <param name="parishionerId"></param>
        /// <param name="parishGroupId"></param>
        /// <returns></returns>
        public async Task DeleteParishionerFromGroup(Guid parishionerId, Guid parishGroupId)
        {
            var parishioner = await _dbContext.Parishioners.Include(x => x.ParishGroups)
                .FirstOrDefaultAsync(x => x.Id == parishionerId);
            var churchGroup = await _dbContext.ParishGroups.FirstOrDefaultAsync(x => x.Id == parishGroupId);

            if (parishioner == null || churchGroup  == null || churchGroup.Parishioners.Any(x => x.Id == parishGroupId))
            {
                return;
            }            
            
            parishioner.ParishGroups.Remove(churchGroup);
            await _dbContext.SaveChangesAsync();    
        }
    }
}
