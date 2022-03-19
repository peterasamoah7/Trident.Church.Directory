using Core.Models;
using Core.Pagination;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task ChangeEmail(ChangeEmailModel model);
        Task ChangePassword(ChangePasswordModel model);
        Task<ApplicationUser> LoginUser(LoginViewModel model);
        Task RegisterUser(Guid parishId, RegisterUserViewModel model);
        Task SendResetEmail(string email);
        Task<PageResult<IEnumerable<ApplicationUser>>> GetUsers(Guid parishId, PageQuery query);
        Task RemoveUser(Guid userId);
    }
}
