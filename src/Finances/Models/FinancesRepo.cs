 using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.Entity;

namespace Finances.Models
{
    public class FinancesRepo : IFinancesRepo
    {
        private FinancesContext _ctx;

        public FinancesRepo(FinancesContext ctx)
        {
            _ctx = ctx;
        }

        public IEnumerable<Transaction> GetAllTransactions()
        {
            return _ctx.Transactions.OrderBy(t => t.Title).ToList();
        }

        public Transaction GetTransactionById(int id)
        {
            return _ctx.Transactions.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Transaction> GetAllTransactionsWithCategory()
        {
            return _ctx.Transactions
                .Include(t => t.TransactionTagMaps)
                .OrderBy(t => t.Title)
                .ToList();
        } 

    }
}
