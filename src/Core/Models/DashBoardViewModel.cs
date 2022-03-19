using System.Collections.Generic;

namespace Core.Models
{
    public class DashboardViewModel
    {
        public int TotalParishes { get; set; }
        public int TotalUnits { get; set; }
        public int TotalSacraments { get; set; }
        public int TotalMembers { get; set; }  
        
        public List<DashboardMetric> Metrics { get; set; } = new List<DashboardMetric>();

        public List<AuditViewModel> Audits { get; set; } = new List<AuditViewModel>();
    }
}
