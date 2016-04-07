using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Finances.Models
{
    public class FinancesContextSeed
    {
        private FinancesContext _context;
        private UserManager<User> _userManager;

        public FinancesContextSeed(FinancesContext context, UserManager<User> userManager )
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("verenichvlad@gmail.com") == null)
            {
                var newUser = new User()
                {
                    UserName = "verenichvlad",
                    Email = "verenichvlad@gmail.com"
                };

                await _userManager.CreateAsync(newUser, "Pa&&w0rd");
            }

            if (_context.Transactions.Any()) return;

            var outTrans1 = new Transaction()
            {
                Title = "Food",
                CreationDate = DateTime.Now,
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                Amount = -230,
                Description = "-"
            };
            _context.Transactions.Add(outTrans1);

            _context.SaveChanges();
        }
    }
}
