using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ChangePasswordModel
    {
        public string Password { get; set; }

        public Guid UserId { get; set; }
    }
}
