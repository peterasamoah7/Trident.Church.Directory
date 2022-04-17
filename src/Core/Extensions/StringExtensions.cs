using System;

namespace Core.Extensions
{
    public static class StringExtensions
    {
        public static DateTime ToDateTime(this string str)
        {
            return !string.IsNullOrEmpty(str) 
                ? DateTime.TryParse(str, out var result) 
                ? result : DateTime.MinValue : DateTime.MinValue;
        }
    }
}
