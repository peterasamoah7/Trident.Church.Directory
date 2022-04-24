using Data.Models;
using System;

namespace Core.Models
{
    public class SacramentViewModel : BaseViewModel
    {
        /// <summary>
        /// Primary Key
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The type of Sacrament
        /// </summary>
        public SacramentType Type { get; set; }

        /// <summary>
        /// Priest
        /// </summary>
        public ParishionerViewModel Priest { get; set; }

        /// <summary>
        /// God Parent
        /// </summary>
        public ParishionerViewModel GodParent { get; set; }

        /// <summary>
        /// Parish
        /// </summary>
        public ParishViewModel Parish { get; set; }
    }
}
