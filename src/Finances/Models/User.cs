using Microsoft.AspNet.Identity.EntityFramework;

namespace Finances.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
    }
}