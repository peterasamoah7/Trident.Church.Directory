using System;

namespace Core.Models
{
    public class ChangePasswordModel
    {
        public string Password { get; set; }

        public Guid UserId { get; set; }
    }
}
