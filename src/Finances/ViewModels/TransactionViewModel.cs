using System;
using Finances.Models;

namespace Finances.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public Category Category { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
    }
}
