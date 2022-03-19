using Core.Models;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IDashboardService
    {
        /// <summary>
        /// Get dashbiard information 
        /// </summary>
        /// <returns></returns>
        Task<DashboardViewModel> GetDashboard( );
    }
}
