using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
