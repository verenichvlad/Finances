﻿namespace Finances.Models
{
    public class TransactionTagMap
    {
        public int TransactionId { get; set; }
        public Transaction Transaction { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
