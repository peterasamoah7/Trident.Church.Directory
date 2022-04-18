using Application.Interfaces;
using Core.Models;
using Core.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IAuditService _auditService;

        public DashboardController(IDashboardService dashboardService, IAuditService auditService)
        {
            _dashboardService = dashboardService;
            _auditService = auditService;
        }

        /// <summary>
        /// Get dashboard
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<DashboardViewModel>> GetDashboard()
        {
            return await _dashboardService.GetDashboard();
        }

        /// <summary>
        /// Get Recent Activities
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PageResult<IEnumerable<AuditViewModel>>>> GetActivity(
            [FromQuery] PageQuery query)
        {
            return await _auditService.GetAllAuditsAsnyc(query.PageNumber, query.PageSize);
        }
    }
}
