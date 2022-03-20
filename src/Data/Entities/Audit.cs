using Data.Models;
using System;

namespace Data.Entities
{
    /// <summary>
    /// Audit Table
    /// </summary>
    public class Audit : BaseEntity
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Audity Type
        /// </summary>
        public AuditType Type { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        public string Message { get; set; }
    }
}
