using Core.Enums;
using System;

namespace Core.Models
{
    public class CreateRelativeModel
    {
        public RelativeType RelativeType { get; set; }

        public Guid RelativeId { get; set; }
    }
}
