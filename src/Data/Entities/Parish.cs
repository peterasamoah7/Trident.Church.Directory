using System;
using System.Collections.Generic;

namespace Data.Entities
{
    /// <summary>
    /// Parish Table
    /// </summary>
    public class Parish : BaseEntity
    {
        /// <summary>
        /// Primary Key
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the parish
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
        /// Church groups
        /// </summary>
        public ICollection<ParishGroup> ChurchGroups { get; set; } = new List<ParishGroup>(); 

        /// <summary>
        /// Parishioners
        /// </summary>
        public ICollection<Parishioner> Parishioners { get; set; } = new List<Parishioner>();

        /// <summary>
        /// Sacraments
        /// </summary>
        public ICollection<Sacrament> Sacraments { get; set; } = new List<Sacrament>();
    }
}
