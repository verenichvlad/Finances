using System;

namespace Finances.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        public Category Category { get; set; }
        public Saving Saving { get; set; }
    }
}
