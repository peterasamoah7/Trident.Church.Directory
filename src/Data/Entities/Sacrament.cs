using Data.Models;
using System;

namespace Data.Entities
{
    public class Sacrament : BaseEntity
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
        /// Parishioner FK
        /// </summary>
        public Guid ParishionerId { get; set; }

        /// <summary>
        /// The Parishioner
        /// </summary>
        public Parishioner Parishioner { get; set; }

        /// <summary>
        /// Parishioner FK
        /// </summary>
        public Guid? PriestId { get; set; }

        /// <summary>
        /// The GodParent FK 
        /// </summary>
        public Guid? GodParentId { get; set; }

        /// <summary>
        /// The Parish FK
        /// </summary>
        public Guid? ParishId { get; set; }
    }
}
