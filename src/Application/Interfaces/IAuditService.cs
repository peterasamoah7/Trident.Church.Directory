using Core.Models;
using Core.Pagination;
using Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuditService
    {
        Task CreateAuditAsync(AuditType type, string Message);
        Task<PageResult<IEnumerable<AuditViewModel>>> GetAllAuditsAsnyc(int pageNumber, int pageSize);
        Task<List<AuditViewModel>> GetAllAuditsAsnyc( );

    }
}
