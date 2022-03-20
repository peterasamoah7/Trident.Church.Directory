using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
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
    }
}
