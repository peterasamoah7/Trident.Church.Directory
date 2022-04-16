using Data.Models;
using System;

namespace Core.Models
{
    public class CreateSacramentModel : BaseViewModel
    {
        /// <summary>
        /// The type of Sacrament
        /// </summary>
        public SacramentType Type { get; set; }

        /// <summary>
        /// Priest
        /// </summary>
        public Guid? Priest { get; set; }

        /// <summary>
        /// God Parent
        /// </summary>
        public Guid? GodParent { get; set; }
    }
}
