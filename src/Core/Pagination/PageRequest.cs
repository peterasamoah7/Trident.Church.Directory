namespace Core.Pagination
{
    public class PageRequest
    {
        public PageRequest()
        {
            PageNumber = 1;
            PageSize = 10;
        }

        public PageRequest(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < 1 ? 1 : pageNumber;
            PageSize = pageSize > 10 ? 10 : pageSize;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
