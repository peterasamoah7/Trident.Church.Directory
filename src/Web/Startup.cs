using Application;
using Data.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using System.Linq;
using Data.Entities;
using System.Collections.Generic;
using Data.Models;
using Core.MappingProfile;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

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

            if(!context.Users.Any())
            {
                var parish = new Parish
                {
                    Name = "St Patrick's Catholic Church",
                    Location = "Ashongman Estate",
                    Address = "1 Jesus Way",
                    PostCode = "G-12345-AA",
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
                            Occupation = "Software Engineer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser2",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser3",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser4",
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
                            FirstName = "TestUser4",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser5",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser6",
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
                            FirstName = "TestUser7",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser8",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser2",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser3",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser4",
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
                            FirstName = "TestUser4",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser5",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser6",
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
                            FirstName = "TestUser7",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser8",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser2",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser3",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser4",
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
                            FirstName = "TestUser4",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser5",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser6",
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
                            FirstName = "TestUser7",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("30/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "TestUser8",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("26/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        }
                    }
                };

                context.Parishes.Add(parish);

                context.Parishes.AddRange(new List<Parish>
                {
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },
                    new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    },new Parish
                    {
                        Name = "St Peter's Catholic Church",
                        Location = "Ashongman Estate",
                        Address = "1 Jesus Way",
                        PostCode = "G-12345-AA",
                    }
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

                context.Parishes.Add(new Parish
                {
                    Id = Guid.NewGuid(),
                    Name = "St Mark's Catholic Church",
                    Location = "Ashongman Estate",
                    Address = "1 Jesus Way",
                    PostCode = "G-12345-AA",
                    
                    ChurchGroups = new List<ParishGroup>
                    {
                        new ParishGroup
                        {
                            Name = "Sunday Born's Group",
                            Active = true,
                            Description = "Group for Sunday Borns",
                            Parishioners = new List<Parishioner>
                            {                             
                                new Parishioner
                                {
                                    FirstName = "TestUser2",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("30/10/1960"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Valuer"
                                },
                                new Parishioner
                                {
                                    FirstName = "TestUser3",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("26/12/1971"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Trader"
                                },
                                new Parishioner
                                {
                                    FirstName = "TestUser4",
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
                                    FirstName = "TestUser4",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("30/10/1960"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Valuer"
                                },
                                new Parishioner
                                {
                                    FirstName = "TestUser5",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("26/12/1971"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Trader"
                                },
                                new Parishioner
                                {
                                    FirstName = "TestUser6",
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
                                    FirstName = "TestUser7",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("30/10/1960"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Valuer"
                                },
                                new Parishioner
                                {
                                    FirstName = "TestUser8",
                                    LastName = "Asamoah",
                                    DateOfBirth = DateTime.Parse("26/12/1971"),
                                    Type = ParishionerType.Member,
                                    Location = "Accra",
                                    PhoneNumber = "07123456789",
                                    Email = "test@test.com",
                                    HomeAddress = "1 Asamoah Way",
                                    PostCode = "GA-1234-AA",
                                    Occupation = "Trader"
                                }
                            }
                        },
                        new ParishGroup
                        {
                            Name = "Monday Born's Group",
                            Active = true,
                            Description = "Group for Monday Borns"
                        },
                        new ParishGroup
                        {
                            Name = "Tuesday Born's Group",
                            Active = true,
                            Description = "Group for Tuesday Borns"
                        }
                    },
                    Parishioners = new List<Parishioner>
                    {
                        new Parishioner
                        {
                            FirstName = "Peter",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("07/07/1991"),
                            Type = ParishionerType.Priest,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Software Engineer"
                        },
                        new Parishioner
                        {
                            FirstName = "Andrew",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("10/10/1960"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Valuer"
                        },
                        new Parishioner
                        {
                            FirstName = "Sarah",
                            LastName = "Asamoah",
                            DateOfBirth = DateTime.Parse("10/12/1971"),
                            Type = ParishionerType.Member,
                            Location = "Accra",
                            PhoneNumber = "07123456789",
                            Email = "test@test.com",
                            HomeAddress = "1 Asamoah Way",
                            PostCode = "GA-1234-AA",
                            Occupation = "Trader"
                        }
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
