using System;

namespace Core.Models
{
    public class CreateParishGroupModel : BaseViewModel
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Name of the parish
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
        /// Group Memberships
        /// </summary>
        public int MemberCount { get; set; }
    }
}