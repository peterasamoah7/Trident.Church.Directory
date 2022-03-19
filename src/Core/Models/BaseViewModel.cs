using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class BaseViewModel
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
