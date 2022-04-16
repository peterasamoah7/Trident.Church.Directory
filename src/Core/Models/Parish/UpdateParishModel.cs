using System;

namespace Core.Models
{
    public class UpdateParishModel : BaseViewModel
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
        public Guid? Priest { get; set; }
    }
}