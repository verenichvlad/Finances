using System;
using System.Linq;

namespace Finances.Models
{
    public class FinancesContextSeed
    {
        private FinancesContext _context;

        public FinancesContextSeed(FinancesContext context)
        {
            _context = context;
        }

        public void EnsureSeedData()
        {
            if (_context.Transactions.Any()) return;

            var saveTrans1 = new Transaction()
            {
                Title = "FebruarySaving",
                Date = DateTime.Now,
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
                Date = DateTime.Now,
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
                Date = DateTime.Now,
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
                Date = DateTime.Now,
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
                Date = DateTime.Now,
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
