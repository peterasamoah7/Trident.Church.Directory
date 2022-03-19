using Core.Models;
using System.Net;

namespace Data.Models
{
    public class Result : BaseResult
    {
        public Result()
        {
            this.Error = Error.None;
        }

        /// <summary>
        /// To track errors
        /// </summary>
        /// <param name="data"></param>
        /// <param name="errors"></param>
        public Result(Error error)
        {
            Error = error;
        }

        /// <summary>
        /// To track errors and status code
        /// </summary>
        /// <param name="data"></param>
        /// <param name="errors"></param>
        public Result(HttpStatusCode statusCode, Error error)
        {
            Error = error;
            StatusCode = statusCode;
        }
    }


    public class Result<T> : BaseResult
    {
        /// <summary>
        /// Most success scenarios
        /// </summary>
        /// <param name="data"></param>
        public Result(T data)
        {
            Data = data;
            Error = Error.None;
        }

        /// <summary>
        /// To track errors
        /// </summary>
        /// <param name="data"></param>
        /// <param name="errors"></param>
        public Result(T data, Error error)
        {
            Data = data;
            Error = error;
        }

        /// <summary>
        /// To track errors and status code
        /// </summary>
        /// <param name="data"></param>
        /// <param name="errors"></param>
        public Result(T data, HttpStatusCode statusCode, Error error)
        {
            Data = data;
            Error = error;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Response Data
        /// </summary>
        public T Data { get; set; }
    }
}
