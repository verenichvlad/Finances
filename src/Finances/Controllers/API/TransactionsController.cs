using System.Collections.Generic;
using Finances.Models;
using Microsoft.AspNet.Mvc;


namespace Finances.Controllers.API
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        public IFinancesRepo _repo { get; set; }

        public TransactionsController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public Transaction Get(int id)
        {
            return _repo.GetTransactionById(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
