using Data.Models;
using System;

namespace Data.Entities
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }

        public Guid Parish { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public UserRole UserRole { get; set; }
    }
}
