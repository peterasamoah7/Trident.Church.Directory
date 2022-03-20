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
        public async Task CreateAuditAsync(AuditType type, string Message)
        {
            var model = new Audit
            {
                Message = Message,
                Type = type,
                CreatedOn = DateTime.Now,
            };
            await _context.Audits.AddAsync(model);
            await _context.SaveChangesAsync();

        }

        public async Task<PageResult<IEnumerable<AuditViewModel>>> GetAllAuditsAsnyc(int pageNumber, int pageSize)
        {
            var request = new PageRequest(pageNumber, pageSize);
            var audits = _context.Audits.AsQueryable();
            var count = audits.Count();
            var model = await audits.OrderByDescending(x => x.CreatedOn)
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                .Select(x => _mapper.Map<AuditViewModel>(x))
                .ToListAsync();
            return new PageResult<IEnumerable<AuditViewModel>>(model, request.PageNumber, request.PageSize, count);
        }

        public async Task<List<AuditViewModel>> GetAllAuditsAsnyc()
        {
            var audits = _context.Audits.AsQueryable();
            var count = audits.Count();
            var model = await audits.OrderByDescending(x => x.CreatedOn)
                .Skip(1 - 1)
                .Take(4)
                .Select(x => _mapper.Map<AuditViewModel>(x))
                .ToListAsync();
            return model;

        }
    }
}
