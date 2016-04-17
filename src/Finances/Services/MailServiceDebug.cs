using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finances.Services
{
    public class MailServiceDebug : IMailService
    {
        public bool SendMail(string to, string @from, string subject, string body)
        {
            Debug.WriteLine($"Sending mail: to:{to}, subject: {subject}, body: {body}");
            return true;
        }
    }
}
