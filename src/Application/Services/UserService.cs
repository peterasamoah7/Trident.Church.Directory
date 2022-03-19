using Application.Interfaces;
using Core.Models;
using Core.Pagination;
using Data.Database;
using Data.Entities;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly ChurchContext _dbContext;
        private readonly IEmailClient _emailClient;

        public UserService(ChurchContext dbContext, IEmailClient emailClient)
        {
            _dbContext = dbContext;
            _emailClient = emailClient;
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task RegisterUser(Guid parishId, RegisterUserViewModel model)
        {
            var existingUser = await _dbContext.Users
                .AnyAsync(x => x.Email == model.Email);

            if (existingUser)
                return;

            var password = BCrypt.Net.BCrypt.HashPassword("Psalm23#");

            var user = new ApplicationUser
            {
                Email = model.Email,
                Password = password,
                Parish = parishId,
                UserRole = UserRole.Parish,
                FullName = $"{model.FirstName} {model.LastName}"
            };

            await _dbContext.Users.AddAsync(user);

            var userProfile = await _dbContext.Parishioners
                .Include(x => x.Parish)
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if(userProfile != null && userProfile.Parish.Id != parishId)
            {
                return;
            }

            await _dbContext.Parishioners.AddAsync(new Parishioner
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                ParishId = parishId
            });

            await _dbContext.SaveChangesAsync();

            await _emailClient.SendAsync("Parish Portal Invite",
                "noreply@parishportal.com", user.Email, 
                "Welcome to Parish Portal. Please follow this <a>link</a> to login. " +
                "Your password is Psalm23. Please change this in the " +
                "profile page after you login. Thank you.");
        }

        /// <summary>
        /// User login
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> LoginUser(LoginViewModel model)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
                return null;

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return null;

            return user;
        }

        /// <summary>
        /// Send password reset email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task SendResetEmail(string email)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Email == email);

            if (user == null) return;

            await _emailClient.SendAsync("Reset Password", 
                "noreply@parishportal.com", email, "Reset your password here");
        }

        /// <summary>
        /// Change a user password
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task ChangePassword(ChangePasswordModel model)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == model.UserId);

            if (user == null) return;

            var password = BCrypt.Net.BCrypt.HashPassword(model.Password);

            user.Password = password;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Change user email
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task ChangeEmail(ChangeEmailModel model)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == model.UserId);

            if (user == null) return;

            user.Email = model.Email;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Get Admin users for a parish
        /// </summary>
        /// <param name="parishId"></param>
        /// <returns></returns>
        public async Task<PageResult<IEnumerable<ApplicationUser>>> GetUsers(Guid parishId, PageQuery query)
        {
            var request = new PageRequest(query.PageNumber, query.PageSize);

            var userQueryable = _dbContext.Users.AsQueryable();

            if(!string.IsNullOrEmpty(query.Query))
            {
                userQueryable.Where(x => x.FullName.Contains(query.Query));
            }

            var users = await userQueryable
                .Where(x => x.Parish == parishId)
                .Skip(request.PageNumber - 1)
                .Take(request.PageSize)
                .ToListAsync();

            var count = await _dbContext.Users.CountAsync();

            return new PageResult<IEnumerable<ApplicationUser>>
                (users, request.PageNumber, request.PageSize, count);
        }

        /// <summary>
        /// Remove a user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task RemoveUser(Guid userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null) return;

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
