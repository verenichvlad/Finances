namespace Finances.Models
{
    public class Saving
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AmountType { get; set; }
        public decimal Amount { get; set; }
    }
}