using System;

namespace Data.Entities
{
    /// <summary>
    /// Church Group Membership Table
    /// </summary>
    public class ParishGroupMembership : BaseEntity
    {
        /// <summary>
        /// Parishioner FK
        /// </summary>
        public Guid ParishionerId { get; set; }

        /// <summary>
        /// Parishioner
        /// </summary>
        public Parishioner Parishioner { get; set; }

        /// <summary>
        /// Church Group FK
        /// </summary>
        public Guid ParishGroupId { get; set; }

        /// <summary>
        /// Church Group
        /// </summary>
        public ParishGroup ParishGroup { get; set; }
    }
}
