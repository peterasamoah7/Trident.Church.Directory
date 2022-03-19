using System;

namespace Core.Pagination
{
    public class PageResult<T>
    {
        public PageResult(T data, int pageNumber, int pageSize, int totalRecords)
        {
            Data = data;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalRecords = totalRecords;
        }

        public T Data { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalRecords { get; set; }

        public int TotalPages
        {
            get
            {
                return Convert.ToInt32(Math.Ceiling((double)TotalRecords / (double)PageSize));
            }
        }

        public string FirstPage
        {
            get
            {
                return $"?{nameof(PageNumber)}=1&{nameof(PageSize)}={PageSize}";
            }
        }

        public string NextPage
        {
            get
            {
                return PageNumber >= 1 && PageNumber < TotalPages ? $"?{nameof(PageNumber)}={PageNumber + 1}&{nameof(PageSize)}={PageSize}" : null;
            }
        }

        public string PreviousPage
        {
            get
            {
                return PageNumber - 1 >= 1 && PageNumber <= TotalPages ? $"?{nameof(PageNumber)}={PageNumber - 1}&{nameof(PageSize)}={PageSize}" : null;
            }
        }

        public string LastPage
        {
            get
            {
                return $"?{nameof(PageNumber)}={TotalPages}&{nameof(PageSize)}={PageSize}";
            }
        }
    }
}
