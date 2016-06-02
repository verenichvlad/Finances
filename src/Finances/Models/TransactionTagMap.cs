namespace Finances.Models
{
    public class TransactionTagMap
    {
        public int TransactionId { get; set; }
        public virtual Transaction Transaction { get; set; }

        public int TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
