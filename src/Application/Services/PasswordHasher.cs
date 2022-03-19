using System;
using System.Security.Cryptography;

namespace Application.Services
{
    public static class PasswordHasher
    {
        /// <summary>
        /// Hash a password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static (string, string) Hash(string password)
        {
            var saltBytes = new byte[16];

            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var hash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return (salt, hash);
        }

        /// <summary>
        /// Verify a password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="hash"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        public static bool Verify(string password, string hash, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var chash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));
            return chash == hash;
        }
    }
}
