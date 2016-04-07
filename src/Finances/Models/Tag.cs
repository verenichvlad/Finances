using System.Collections.Generic;

namespace Finances.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<TransactionTagMap> TransactionTagMaps { get; set; } 
    }
}
