using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System;

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
                .OrderBy(t => t.CreationDate)
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

        public bool RemoveTransaction(int id)
        {
            var transToRemove = _ctx.Transactions.FirstOrDefault(trans => trans.Id == id);

            if (transToRemove == null) return false;
            else _ctx.Transactions.Remove(transToRemove);

            return true;
        }
    }
}
