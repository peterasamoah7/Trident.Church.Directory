using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Application.Clients
{
    public class EmailClient : IEmailClient
    {
        private readonly SendGridClient _client;

        public EmailClient(IConfiguration config)
        {
            _client = new SendGridClient(config["SendGridApiKey"]);
        }

        public async Task SendAsync(string title, string from, string to, string htmlContent)
        {
            var sender = new EmailAddress(from);
            var recipient = new EmailAddress(to);
            var msg = MailHelper.CreateSingleEmail(sender, recipient, title, null, htmlContent);
            await _client.SendEmailAsync(msg);
        }
    }
}
