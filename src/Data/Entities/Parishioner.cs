using Data.Models;
using System;
using System.Collections.Generic;

namespace Data.Entities
{
    /// <summary>
    /// Parishioner Details
    /// </summary>
    public class Parishioner : BaseEntity
    {
        /// <summary>
        /// Primary Key
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// First Name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last Name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Date of Birth
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Parishioner Father Id
        /// </summary>
        public Guid? FatherId { get; set; }

        /// <summary>
        /// Parishioner Mother Id
        /// </summary>
        public Guid? MotherId { get; set; }

        /// <summary>
        /// Parishner's Partner Id
        /// </summary>
        public Guid? Partner { get; set; }

        /// <summary>
        /// Type of Parishioner
        /// </summary>
        public ParishionerType Type { get; set; }

        /// <summary>
        /// Birth Location
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// Parishioner Phone Number
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Parishioner Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Home Address
        /// </summary>
        public string HomeAddress { get; set; }

        /// <summary>
        /// Home Postcode
        /// </summary>
        public string PostCode { get; set; }

        /// <summary>
        /// Parishioner Occupation
        /// </summary>
        public string Occupation { get; set; }

        /// <summary>
        /// Parish FK
        /// </summary>
        public Guid ParishId { get; set; }

        /// <summary>
        /// Parish Nav Prop
        /// </summary>
        public Parish Parish { get; set; }

        /// <summary>
        /// Sacraments
        /// </summary>
        public ICollection<Sacrament> Sacraments { get; set; } = new List<Sacrament>();

        /// <summary>
        /// Group Memberships
        /// </summary>
        public ICollection<ParishGroup> ParishGroups { get; set; } = new List<ParishGroup>(); 
    }
}
