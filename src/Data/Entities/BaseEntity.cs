using Data.Interfaces;
using System;

namespace Data.Entities
{
    /// <summary>
    /// Base entity
    /// </summary>
    public class BaseEntity : IBaseEntity
    {
        /// <summary>
        /// Created on 
        /// </summary>
        public DateTime CreatedOn { get; set; }
        
        /// <summary>
        /// Updated on
        /// </summary>
        public DateTime? UpdatedOn { get; set; }
    }
}
