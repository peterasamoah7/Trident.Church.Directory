using System;

namespace Core.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToFullDate(this DateTime dateTime)
        {
            return dateTime.ToString("dddd, dd MMMM yyyy");       
        }

        public static string ToDayMonth(this DateTime dateTime)
        {
            return dateTime.ToString("MMMM dd");
        }
    }
}
