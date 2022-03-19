using Data.Models;
using System;
using System.Security.Claims;

namespace Web.Extensions
{
    public static class ClaimsExtensions
    {
        /// <summary>
        /// Get use email
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string Email(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }

        /// <summary>
        /// Get the ApplicationUser Id
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Guid UserId(this ClaimsPrincipal user)
        {
            return Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        /// <summary>
        /// Get the Parish Id
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Guid Parish(this ClaimsPrincipal user)
        {
            return Guid.Parse(user.FindFirstValue(ClaimTypes.Locality));
        }

        /// <summary>
        /// Get the user role
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static UserRole Role(this ClaimsPrincipal user)
        {
            return Enum.Parse<UserRole>(user.FindFirstValue(ClaimTypes.Role));
        }
    }
}
