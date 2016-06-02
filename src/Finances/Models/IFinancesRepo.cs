using System.Collections.Generic;

namespace Finances.Models
{
    public interface IFinancesRepo
    {
        IEnumerable<Transaction> GetCurrentUserTransactions(string currentUserId);
        void AddTransaction(Transaction trans, string currentUserId);
        void AddTransactions(List<Transaction> transactions);
        bool SaveAll();
        User GetUserById(string currentUserId);
        void RemoveTransaction(int id);
        void RemoveTag(int id);
        void AddTag(Tag tag, string userId);
        IEnumerable<Tag> GetUserTags(string userId);
        void ChangeUser(User user, string userId);
        void UpdateTransaction(Transaction transaction);
        Tag GetTagById(int id);
    }
}