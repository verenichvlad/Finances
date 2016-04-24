using System.Collections.Generic;

namespace Finances.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal MonthLimit { get; set; }
        public bool ShowOnDailyStats { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<TransactionTagMap> TransactionTagMaps { get; set; } 
    }
}
