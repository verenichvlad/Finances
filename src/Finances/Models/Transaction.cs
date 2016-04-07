using System;
using System.Collections.Generic;

namespace Finances.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public TransactionType TransactionType { get; set; }


        public virtual User User { get; set; }
        public virtual ICollection<TransactionTagMap> TransactionTagMaps { get; set; }
    }

    public enum TransactionType
    {
        In = 1,
        Out,
        Refund
    }
}
