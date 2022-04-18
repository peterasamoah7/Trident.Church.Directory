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
    public class AuditService : IAuditService
    {
        private readonly ChurchContext _context;
        private readonly IMapper _mapper;
        public AuditService(ChurchContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task CreateAuditAsync(
            AuditType type, string Message, Guid parish)
        {
            var model = new Audit
            {
                Message = Message,
                Type = type,
                CreatedOn = DateTime.Now,
                ParishId = parish,
            };
            await _context.Audits.AddAsync(model);
            await _context.SaveChangesAsync();

        }

        public async Task<PageResult<IEnumerable<AuditViewModel>>> GetAllAuditsAsnyc(
            int pageNumber, int pageSize, Guid parish)
        {
            var request = new PageRequest(pageNumber, pageSize);

            var audits = _context.Audits.AsQueryable();

            var count = await _context.Audits.CountAsync(x => x.ParishId == parish);

            var model = await audits
                .Where(x => x.ParishId == parish)
                .OrderByDescending(x => x.CreatedOn)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => _mapper.Map<AuditViewModel>(x))
                .ToListAsync();

            return new PageResult<IEnumerable<AuditViewModel>>(
                model, request.PageNumber, request.PageSize, count);
        }

        public async Task<List<AuditViewModel>> GetAllAuditsAsnyc(Guid parish)
        {
            var audits = _context.Audits.AsQueryable();

            var count = await _context.Audits.CountAsync(x => x.ParishId == parish);

            var model = await audits
                .Where(x => x.ParishId == parish)
                .OrderByDescending(x => x.CreatedOn)
                .Skip(0).Take(4)
                .Select(x => _mapper.Map<AuditViewModel>(x))
                .ToListAsync();

            return model;
        }
    }
}
