using Finances.Models;
using Microsoft.AspNet.Mvc;

namespace Finances.Controllers.Api
{

    public class TransactionsController : Controller
    {
        private IFinancesRepo _repo;

        public TransactionsController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("api/transactions")]
        public JsonResult Get()
        {
            var results = _repo.GetAllTransactionsWithCategory();
            return Json(results);
        }
    }
}
