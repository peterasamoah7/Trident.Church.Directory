using Application.Interfaces;
using Core.Models;
using Data.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ChurchContext _context;
        private readonly IAuditService _auditService;
        public DashboardService(ChurchContext context, IAuditService auditService)
        {
            _context = context;
            _auditService = auditService;
        }
        public async Task<DashboardViewModel> GetDashboard()
        {
            var model = new DashboardViewModel();
            var date = DateTime.Now.AddDays(-30);

            var parishesCount = await _context.Parishes.CountAsync(x => x.CreatedOn > date);
            model.Metrics.Add(new DashboardMetric
            {
                Title = "Total Parishes",
                Metric = parishesCount,
                Increased = parishesCount > 0,
                Summary = $"{parishesCount} new parishes last month"
            });

            var parishionerCount = await _context.Parishioners.CountAsync(x => x.CreatedOn > date);
            model.Metrics.Add(new DashboardMetric
            {
                Title = "Total Parishioners",
                Metric = parishionerCount,
                Increased = parishionerCount > 0,
                Summary = $"{parishionerCount} new parishioners last month"
            });

            var parishGroupCount = await _context.ParishGroups.CountAsync(x => x.CreatedOn > date);
            model.Metrics.Add(new DashboardMetric
            {
                Title = "Total Parish Groups",
                Metric = parishGroupCount,
                Increased = parishGroupCount > 0,
                Summary = $"{parishGroupCount} new groups last month"
            });

            var sacramentCount = await _context.Sacraments.CountAsync(x => x.CreatedOn > date);
            model.Metrics.Add(new DashboardMetric
            {
                Title = "Total Sacraments",
                Metric = sacramentCount,
                Increased = sacramentCount > 0,
                Summary = $"{sacramentCount} sacrament completed last month"
            });

            model.TotalParishes = await _context.Parishes.CountAsync();
            model.TotalSacraments = await _context.Sacraments.CountAsync();
            model.TotalUnits = await _context.ParishGroups.CountAsync();
            model.TotalMembers = await _context.Parishioners.CountAsync();
            model.Audits = await _auditService.GetAllAuditsAsnyc();

            return model;
        }
    }
}
