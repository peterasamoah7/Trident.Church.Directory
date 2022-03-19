using System;

namespace Core.Models
{
    public class ChangeEmailModel
    {
        public string Email { get; set; }

        public Guid UserId { get; set; }
    }
}
