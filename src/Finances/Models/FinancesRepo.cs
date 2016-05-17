using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;

namespace Finances.Models
{
    public class FinancesRepo : IFinancesRepo
    {
        private FinancesContext _ctx;
        private UserManager<User> _userManager;

        public FinancesRepo(FinancesContext ctx, UserManager<User> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public IEnumerable<Transaction> GetCurrentUserTransactions(string currentUserId)
        {
            return _ctx.Transactions
                .Where(trans => trans.User.Id == currentUserId)
                .OrderByDescending(t => t.CreationDate)
                .ToList();
        }

        public void AddTransaction(Transaction trans, string currentUserId)
        {
            var user = GetUserById(currentUserId);
            _ctx.Transactions.Add(new Transaction()
            {
                User = user,
                TransactionType = trans.TransactionType,
                Amount = trans.Amount,
                Title = trans.Title,
                CreationDate = trans.CreationDate,
                Description = trans.Description,
                TransactionTagMaps = trans.TransactionTagMaps
            });
        }

        public User GetUserById(string userId)
        {
            return _ctx.Users.FirstOrDefault(user => user.Id == userId);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public void RemoveTransaction(int id)
        {
            var transToRemove = _ctx.Transactions.FirstOrDefault(trans => trans.Id == id);

            if (transToRemove == null) throw new Exception("Failed to remove transaction");

            _ctx.Transactions.Remove(transToRemove);
        }

        public void AddTransactions(List<Transaction> transactions)
        {
            foreach (var transaction in transactions)
                _ctx.Transactions.Add(transaction);
        }

        public void AddTag(Tag tag, string userId)
        {
            var user = GetUserById(userId);
            _ctx.Tags.Add(new Tag()
            {
                User = user,
                MonthLimit = tag.MonthLimit,
                Title = tag.Title,
                ShowOnDailyStats = tag.ShowOnDailyStats
            });
        }

        public IEnumerable<Tag> GetUserTags(string userId)
        {
            return _ctx.Tags
                .Where(tag => tag.User.Id == userId)
                .ToList();
        }

        public void ChangeUser(User user, string userId)
        {
            var dbUser = GetUserById(userId);

            dbUser.FirstName = user.FirstName;
            dbUser.SecondName = user.SecondName;
            dbUser.Email = user.Email;
            dbUser.UserName = user.UserName;
        }

        public void RemoveTag(int id)
        {
            var tagToRemove = _ctx.Tags.FirstOrDefault(tag => tag.Id == id);

            if (tagToRemove == null) throw new Exception("Failed to remove Tag");

            _ctx.Tags.Remove(tagToRemove);
        }

        public void UpdateTransaction(Transaction transaction)
        {
            var transactionToChange = _ctx.Transactions.FirstOrDefault(t => t.Id == transaction.Id);
            if(transactionToChange == null) throw new Exception("No matching transaction was found");
            transactionToChange = transaction;
        }
    }
}
