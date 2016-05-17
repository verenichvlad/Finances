using System.ComponentModel.DataAnnotations;

namespace Finances.ViewModels
{
    public class UserViewModel
    {
        [StringLength(255, MinimumLength = 2)]
        public string Username { get; set; }
        [StringLength(255, MinimumLength = 5)]
        public string Email { get; set; }
        [StringLength(255, MinimumLength = 2)]
        public string FirstName { get; set; }
        [StringLength(255, MinimumLength = 2)]
        public string SecondName { get; set; }
    }
}
