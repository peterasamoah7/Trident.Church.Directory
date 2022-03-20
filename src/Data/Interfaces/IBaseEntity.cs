using System;

namespace Data.Interfaces
{
    /// <summary>
    /// Base entity interface
    /// </summary>
    public interface IBaseEntity
    {
        /// <summary>
        /// Created on
        /// </summary>
        DateTime CreatedOn { get; set; }

        /// <summary>
        /// Updted on
        /// </summary>
        DateTime? UpdatedOn { get; set; }
    }
}
