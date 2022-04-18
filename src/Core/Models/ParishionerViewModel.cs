using Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class ParishionerViewModel : BaseViewModel
    {
        /// <summary>
        /// Primary Key
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// First Name
        /// </summary>
        [Required]
        public string FirstName { get; set; }

        /// <summary>
        /// Last Name
        /// </summary>
        [Required]
        public string LastName { get; set; }

        /// <summary>
        /// Date of Birth
        /// </summary>
        public string DateOfBirth { get; set; }

        /// <summary>
        /// Birth Location
        /// </summary>
        [Required]
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
        /// Father
        /// </summary>
        public ParishionerViewModel Father { get; set; }

        /// <summary>
        /// Type of Parishioner
        /// </summary>
        public ParishionerType Type { get; set; }

        /// <summary>
        /// Mother
        /// </summary>
        public ParishionerViewModel Mother { get; set; }

        /// <summary>
        /// PartnerId
        /// </summary>
        public ParishionerViewModel Partner { get; set; }

        /// <summary>
        /// Sacraments
        /// </summary>
        public ICollection<SacramentViewModel> Sacraments { get; set; } = new List<SacramentViewModel>();


        /// <summary>
        /// Parish Groups
        /// </summary>
        public ICollection<ParishGroupViewModel> ParishGroups { get; set; } = new List<ParishGroupViewModel>();
    }
}
