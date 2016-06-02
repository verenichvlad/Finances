using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/dashboard")]
    public class DashboardController : Controller
    {
        private IFinancesRepo _repo;

        public DashboardController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("expances")]
        public JsonResult GetExpances()
        {
            var transactions = _repo.GetCurrentUserTransactions(User.GetUserId());

            if (transactions == null) return Json(null);

            var vm = Mapper.Map<IEnumerable<TransactionViewModel>>(transactions);
            foreach (var transactionViewModel in vm)
            {
                var transaction = transactions.FirstOrDefault(dr => dr.Id == transactionViewModel.Id);
                foreach (var transactionTagMap in transaction.TransactionTagMaps)
                {
                    transactionViewModel.Tags = transactionViewModel.Tags ?? new List<TagViewModel>();
                    transactionViewModel.Tags.Add(Mapper.Map<TagViewModel>(_repo.GetTagById(transactionTagMap.TagId)));
                }
            }
            return Json(vm.Where(tvm => tvm.TransactionType == TransactionType.BankOut || tvm.TransactionType == TransactionType.UserOut));
        }
    }
}
