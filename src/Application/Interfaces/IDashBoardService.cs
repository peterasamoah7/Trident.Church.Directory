using Core.Models;
using System;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IDashboardService
    {
        /// <summary>
        /// Get dashbiard information 
        /// </summary>
        /// <returns></returns>
        Task<DashboardViewModel> GetDashboard(Guid parish);
    }
}
