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

            var saveTrans1 = new Transaction()
            {
                Title = "FebruarySaving",
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                CreationDate = DateTime.Now,
                Amount = 1500,
                Category = new Category()
                {
                    Name = "Saving",
                    Shorten = "Sv"
                },
                Description = "Its saving for February",
                Saving = new Saving()
                {
                    Amount = 1500,
                    AmountType = "zl",
                    Name = "FebruarySaving"
                }
            };

            var incTrans1 = new Transaction()
            {
                Title = "FebruaryIncome",
                CreationDate = DateTime.Now,
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                Amount = 4000,
                Category = new Category()
                {
                    Name = "Income",
                    Shorten = "Inc"
                },
                Description = "Its income for February",
                Saving = null
            };

            var outTrans1 = new Transaction()
            {
                Title = "Food",
                CreationDate = DateTime.Now,
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                Amount = -230,
                Category = new Category()
                {
                    Name = "Food",
                    Shorten = "Fd"
                },
                Description = "-",
                Saving = null
            };

            var outTrans2 = new Transaction()
            {
                Title = "Tv",
                CreationDate = DateTime.Now,
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                Amount = -1005,
                Category = new Category()
                {
                    Name = "Big",
                    Shorten = "bg"
                },
                Description = "-",
                Saving = null
            };

            var outTrans3 = new Transaction()
            {
                Title = "Clothes",
                CreationDate = DateTime.Now,
                User = await _userManager.FindByEmailAsync("verenichvlad@gmail.com"),
                Amount = -432,
                Category = new Category()
                {
                    Name = "Clothes",
                    Shorten = "Cls"
                },
                Description = "-",
                Saving = null
            };

            _context.Transactions.Add(saveTrans1);
            _context.Transactions.Add(incTrans1);
            _context.Transactions.Add(outTrans1);
            _context.Transactions.Add(outTrans2);
            _context.Transactions.Add(outTrans3);

            foreach (var transaction in _context.Transactions)
            {
                _context.Categories.Add(transaction.Category);

                if(transaction.Saving != null)
                    _context.Savings.Add(transaction.Saving);
            }

            _context.SaveChanges();
        }
    }
}
