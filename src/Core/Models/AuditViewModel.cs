using Data.Models;
using System;

namespace Core.Models
{
    public class AuditViewModel : BaseViewModel
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

        /// <summary>
        /// Date Created
        /// </summary>
        public string Date { get; set; }
    }
}
