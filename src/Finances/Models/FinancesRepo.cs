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
            trans.User = GetUserById(currentUserId);
            _ctx.Transactions.Add(trans);
        }

        public User GetUserById(string userId)
        {
            return _ctx.Users.FirstOrDefault(user => user.Id == userId);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }
    }
}
