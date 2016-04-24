using System.ComponentModel.DataAnnotations;

namespace Finances.ViewModels
{
    public class TagViewModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Title { get; set; }
        public decimal MonthLimit { get; set; }
        public bool ShowOnDailyStats { get; set; }
    }
}
