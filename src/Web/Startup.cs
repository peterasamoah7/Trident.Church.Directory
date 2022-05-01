using Application;
using Core.MappingProfile;
using Data.Database;
using Data.Entities;
using Data.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.ExpireTimeSpan = new TimeSpan(24, 0, 0); // Expires in 24 hours
                    options.Events.OnRedirectToLogin = (context) =>
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    };

                    options.Cookie.HttpOnly = true;
                    options.Cookie.SameSite = SameSiteMode.Strict;
                });



            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            ConfigureDatabase(services);

            services.RegisterApplication();
            services.AddControllersWithViews().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                opt.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                opt.SerializerSettings.Converters.Add(new StringEnumConverter());
            });
            services.AddAutoMapper(typeof(BaseMappingProfile));
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void ConfigureDatabase(IServiceCollection services)
        {
            var environment = Configuration["Environment"];

            switch (environment)
            {
                case "Prod":
                    services.AddDbContext<ChurchContext>(options => options.UseSqlServer(
                        Configuration.GetConnectionString("DefaultConnection")));
                    break;
                case "Dev":
                    services.AddDbContext<ChurchContext>(options => options.UseSqlite(
                       Configuration.GetConnectionString("DefaultConnection")));
                    break;
                default:
                    services.AddDbContext<ChurchContext>(options => options.UseInMemoryDatabase(
                        Configuration.GetConnectionString("DefaultConnection")));
                    break;
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            AddTestUser(app);

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        public void AddTestUser(IApplicationBuilder app)
        {
            var context = app.ApplicationServices
                .CreateScope()
                .ServiceProvider
                .GetRequiredService<ChurchContext>();                       

            if (context.Users.Any())
            {
                return;
            }

            var parish = new Parish
            {
                Id = Guid.Parse("e7ebc196-4b43-422d-b889-3181dac47358"),
                Name =  "St Augustine's Catholic Church",
                Location = "Cape Coast"
            };

            context.Parishes.Add(parish);

            var user = new ApplicationUser
            {
                Parish = Guid.Parse("e7ebc196-4b43-422d-b889-3181dac47358"),
                Email = "test@test.com",
                Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                FullName = "Peter Asamoah",
                UserRole = UserRole.Admin
            };

            context.Users.Add(user);
            context.SaveChanges();

            var priest = new Parishioner
            {
                FirstName = "Stephen",
                LastName =  "Amoah Gyasi",
                DateOfBirth = DateTime.Parse("12/12/1991"),
                Type = ParishionerType.Priest,
                Location = "Accra",
                PhoneNumber = "123456789",
                Email = "father@priest.com",
                ParishId = Guid.Parse("e7ebc196-4b43-422d-b889-3181dac47358")
            };

            context.Parishioners.Add(priest);
            context.SaveChanges();
        }
    }
}
