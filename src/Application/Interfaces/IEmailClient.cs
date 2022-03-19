using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEmailClient
    {
        Task SendAsync(string title, string from, string to, string htmlContent);
    }
}
