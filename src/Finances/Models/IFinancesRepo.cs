using System.Collections.Generic;

namespace Finances.Models
{
    public interface IFinancesRepo
    {
        IEnumerable<Transaction> GetAllTransactions();
        IEnumerable<Transaction> GetAllTransactionsWithCategory();
        Transaction GetTransactionById(int id);
    }
}