using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Finances.Models;

namespace Finances.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Title { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        [Required]
        public TransactionType TransactionType { get; set; }
        public List<TagViewModel> Tags { get; set; }
    }
}
