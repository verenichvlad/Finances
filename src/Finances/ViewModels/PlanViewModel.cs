using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity.Query.Expressions;

namespace Finances.ViewModels
{
    public class PlanViewModel
    {
        public int Id { get; set; }
        
        public decimal DaysAvg { get; set; }

    }
}
