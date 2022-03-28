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

            services.AddDbContext<ChurchContext>(options =>
                options.UseInMemoryDatabase(
                    Configuration.GetConnectionString("DefaultConnection")));

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

            if (!context.Users.Any())
            {
                var parish = new Parish
                {
                    Id = Guid.Parse("9a90d801-ed7f-4315-af1f-a00086fdc81b"),
                    Name = "St Patrick's Catholic Church",
                    Location = "Ashongman Estate",
                    Address = "1 Jesus Way",
                    PostCode = "G-12345-AA",
                    Parishioners = new List<Parishioner>
                    {
                        new Parishioner
                        {
                            Id = Guid.Parse("5b61d801-ed7f-4315-af1f-a98286fdc81b"),
                            FirstName = "TestUser1",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Priest,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer",
                        },
                        new Parishioner
                        {
                            Id = Guid.Parse("6C72E801-ed7f-4315-af1f-a98286fdc81b"),
                            FirstName = "TestUser100",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer",
                        },
                        new Parishioner
                        {
                            Id = Guid.Parse("8C61d801-fe7f-3415-fa1f-a89286fdc81b"),
                            FirstName = "TestUser102",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer"
                        },
                        new Parishioner
                        {
                            Id = Guid.Parse("8C61d801-fe7f-3415-fa1f-a29886fdc81b"),
                            FirstName = "TestUser104",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer"
                        },
                        new Parishioner
                        {
                            Id = Guid.Parse("9a90d801-ed7f-4315-af1f-a98286fdc81b"),
                            FirstName = "TestUser103",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer",
                            FatherId = Guid.Parse("6C72E801-ed7f-4315-af1f-a98286fdc81b"),
                            MotherId = Guid.Parse("8C61d801-fe7f-3415-fa1f-a89286fdc81b"),
                            Partner = Guid.Parse("8C61d801-fe7f-3415-fa1f-a29886fdc81b"),
                            Sacraments = new List<Sacrament>
                            {
                                new Sacrament
                                {
                                    Type = SacramentType.Baptism,
                                    PriestId = Guid.Parse("5b61d801-ed7f-4315-af1f-a98286fdc81b"),
                                    ParishId = Guid.Parse("9a90d801-ed7f-4315-af1f-a00086fdc81b"),
                                    CreatedOn =  DateTime.Parse("07/07/1991")
                                },
                                new Sacrament
                                {
                                    Type = SacramentType.FirstCommunion,
                                    PriestId = Guid.Parse("5b61d801-ed7f-4315-af1f-a98286fdc81b"),
                                    ParishId = Guid.Parse("9a90d801-ed7f-4315-af1f-a00086fdc81b"),
                                    CreatedOn =  DateTime.Parse("07/07/1991")
                                },
                                new Sacrament
                                {
                                    Type = SacramentType.HolyMatrimory,
                                    PriestId = Guid.Parse("5b61d801-ed7f-4315-af1f-a98286fdc81b"),
                                    ParishId = Guid.Parse("9a90d801-ed7f-4315-af1f-a00086fdc81b"),
                                    CreatedOn =  DateTime.Parse("07/07/1991")
                                },
                                new Sacrament
                                {
                                    Type = SacramentType.HolyOrders,
                                    PriestId = Guid.Parse("5b61d801-ed7f-4315-af1f-a98286fdc81b"),
                                    ParishId = Guid.Parse("9a90d801-ed7f-4315-af1f-a00086fdc81b"),
                                    CreatedOn =  DateTime.Parse("07/07/1991")
                                }
                            },
                            ParishGroups = new List<ParishGroup>
                            {
                                new ParishGroup
                                {
                                    Name = "Men's Fellowship",
                                    Active = true,
                                    Description = "A group for Christian men",
                                },
                                new ParishGroup
                                {
                                    Name = "Youth Choir",
                                    Active = true,
                                    Description = "A group for youth singers",
                                }
                            }
                        }                                                                      
                    }
                };

                context.Parishes.Add(parish);

                context.ParishGroups.AddRange(new List<ParishGroup>()
                {
                    new ParishGroup
                    {
                        Name = "Sunday Groups",
                        Active = true,
                        Description = "A group for Sunday borns",
                        ParishId = parish.Id,
                        Parishioners = new List<Parishioner>
                        {
                            new Parishioner
                            {
                                FirstName = "TestUser1",
                                LastName = "Asamoah",
                                DateOfBirth = DateTime.Parse("07/07/1991"),
                                Type = ParishionerType.Priest,
                                Location = "Accra",
                                PhoneNumber = "07123456789",
                                Email = "test@test.com",
                                HomeAddress = "1 Asamoah Way",
                                PostCode = "GA-1234-AA",
                                Occupation = "Software Engineer",
                            },
                            new Parishioner
                            {
                                FirstName = "TestUser1",
                                LastName = "Asamoah",
                                DateOfBirth = DateTime.Parse("07/07/1991"),
                                Type = ParishionerType.Member,
                                Location = "Accra",
                                PhoneNumber = "07123456789",
                                Email = "test@test.com",
                                HomeAddress = "1 Asamoah Way",
                                PostCode = "GA-1234-AA",
                                Occupation = "Software Engineer",
                            }
                        }
                    },
                    new ParishGroup
                    {
                        Name = "Monday Groups",
                        Active = true,
                        Description = "A group for Sunday borns",
                        ParishId = parish.Id,
                        Parishioners = new List<Parishioner>
                        {
                            new Parishioner
                            {
                                FirstName = "TestUser1",
                                LastName = "Asamoah",
                                DateOfBirth = DateTime.Parse("07/07/1991"),
                                Type = ParishionerType.Priest,
                                Location = "Accra",
                                PhoneNumber = "07123456789",
                                Email = "test@test.com",
                                HomeAddress = "1 Asamoah Way",
                                PostCode = "GA-1234-AA",
                                Occupation = "Software Engineer",
                            },
                            new Parishioner
                            {
                                FirstName = "TestUser1",
                                LastName = "Asamoah",
                                DateOfBirth = DateTime.Parse("07/07/1991"),
                                Type = ParishionerType.Member,
                                Location = "Accra",
                                PhoneNumber = "07123456789",
                                Email = "test@test.com",
                                HomeAddress = "1 Asamoah Way",
                                PostCode = "GA-1234-AA",
                                Occupation = "Software Engineer",
                            }
                        }
                    }
                });

                context.Parishes.AddRange(new List<Parish>
                {
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                });

                context.SaveChanges();

                context.Users.AddRange(new List<ApplicationUser>
                {
                    new ApplicationUser
                    {
                        Email = "test@test.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                        Parish = parish.Id,
                        FullName = "Tester001 Test"
                    },
                    new ApplicationUser
                    {
                        Email = "test002@test.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                        Parish = parish.Id,
                        FullName = "Tester002 Test"
                    },
                    new ApplicationUser
                    {
                        Email = "test003@test.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                        Parish = parish.Id,
                        FullName = "Tester003 Test"
                    },
                    new ApplicationUser
                    {
                        Email = "test004@test.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                        Parish = parish.Id,
                        FullName = "Tester004 Test"
                    },
                    new ApplicationUser
                    {
                        Email = "test005@test.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("Psalm23#"),
                        Parish = parish.Id,
                        FullName = "Tester005 Test"
                    }
                });

                context.Audits.AddRange(new List<Audit>
                {
                    new Audit
                    {
                        Type = AuditType.Created,
                        Message = "An item was created"
                    },
                    new Audit
                    {
                        Type = AuditType.Deleted,
                        Message = "An item was deleted"
                    },
                    new Audit
                    {
                        Type = AuditType.Updated,
                        Message = "An item was updated"
                    },
                    new Audit
                    {
                        Type = AuditType.Created,
                        Message = "Many items were created"
                    },
                    new Audit
                    {
                        Type = AuditType.Created,
                        Message = "Many items were deleted"
                    },
                });

                context.SaveChanges();
            }
        }
    }
}
