using Core.Models;
using Core.Pagination;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuditService
    {
        Task CreateAuditAsync(AuditType type, string Message, Guid parish);
        Task<PageResult<IEnumerable<AuditViewModel>>> GetAllAuditsAsnyc(int pageNumber, int pageSize, Guid parish);
        Task<List<AuditViewModel>> GetAllAuditsAsnyc(Guid parish);

    }
}
