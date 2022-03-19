using System.Net;

namespace Core.Models
{
    public  class BaseResult
    {
        /// <summary>
        /// Response Status Code
        /// </summary>
        public HttpStatusCode StatusCode { get; set; }

        /// <summary>
        /// Error messages
        /// </summary>
        public Error Error { get; set; }
    }
}
