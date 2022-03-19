using System;
using System.Collections.Generic;

namespace Data.Entities
{
    /// <summary>
    /// Church Group table
    /// </summary>
    public class ParishGroup : BaseEntity
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
        /// Active
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// FK Parish
        /// </summary>
        public Guid ParishId { get; set; }

        /// <summary>
        /// Nav Prop
        /// </summary>
        public Parish Parish { get; set; }

        /// <summary>
        /// Group Memberships
        /// </summary>
        public ICollection<Parishioner> Parishioners { get; set; } = new List<Parishioner>();

    }
}
