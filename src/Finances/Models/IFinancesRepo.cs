using System.Collections.Generic;

namespace Finances.Models
{
    public interface IFinancesRepo
    {
        IEnumerable<Transaction> GetCurrentUserTransactions(string currentUserId);
        void AddTransaction(Transaction trans, string currentUserId);
        bool SaveAll();
        User GetUserById(string currentUserId);
    }
}