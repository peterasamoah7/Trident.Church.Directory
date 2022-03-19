using System;
using System.Collections.Generic;

namespace Core.Models
{
    public class ParishViewModel : BaseViewModel
    {
        /// <summary>
        /// Primary key
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of group
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Location of parish
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// Physical address of parish
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Address postcode
        /// </summary>
        public string PostCode { get; set; }

        /// <summary>
        /// Members Counts
        /// </summary>
        public int MemberCount { get; set; }

        /// <summary>
        /// Associated Priest
        /// </summary>
        public ParishionerViewModel Priest { get; set; }

        /// <summary>
        /// Church groups
        /// </summary>
        public ICollection<ParishGroupViewModel> ChurchGroups { get; set; } = new List<ParishGroupViewModel>();

        /// <summary>
        /// Parishioners
        /// </summary>
        public ICollection<ParishionerViewModel> Parishioners { get; set; } = new List<ParishionerViewModel>();

        /// <summary>
        /// Sacraments
        /// </summary>
        public ICollection<SacramentViewModel> Sacraments { get; set; } = new List<SacramentViewModel>();
    }
}
