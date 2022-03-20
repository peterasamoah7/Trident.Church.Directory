using Application.Clients;
using Application.Interfaces;
using Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class ServiceCollectionsExtension
    {
        /// <summary>
        /// Add Application Services
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection RegisterApplication(this IServiceCollection services)
        {
            return services
                .AddMediatR(typeof(ServiceCollectionsExtension).Assembly)
                .AddScoped<IParishionerService, ParishionerService>()
                .AddScoped<IEmailClient, EmailClient>()
                .AddScoped<IParishService, ParishService>()
                .AddScoped<IParishGroupService, ParishGroupService>()
                .AddScoped<ISacramentService, SacramentService>()
                .AddScoped<IParishionerService, ParishionerService>()
                .AddScoped<IAuditService, AuditService>()
                .AddScoped<IDashboardService, DashboardService>()
                .AddScoped<IParishionerService, ParishionerService>()
                .AddScoped<IUserService, UserService>();
        }
    }
}
