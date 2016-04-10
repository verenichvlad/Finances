using System;
using System.Collections.Generic;
using System.Net;
using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;
using Microsoft.AspNet.Authorization;
using System.Linq;
using Newtonsoft.Json;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/transactions")]
    public class TransactionsController : Controller
    {
        private readonly IFinancesRepo _repo;

        public TransactionsController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public JsonResult GetCurrentUser()
        {
            var transactions = _repo.GetCurrentUserTransactions(User.GetUserId());

            if (transactions == null) return Json(null);

            return Json(Mapper.Map<IEnumerable<TransactionViewModel>>(transactions));
        }

        [HttpGet("typesDictionary")]
        public JsonResult GetTransactionTypesDict()
        {
            var dict = Enum.GetValues(typeof(TransactionType))
               .Cast<TransactionType>()
               .ToDictionary(t => (int)t, t => t.ToString())
               .Select(dc => new { value = dc.Key, name = dc.Value});

            return Json(dict);
        }



        [HttpPost]
        public JsonResult CreateTransaction([FromBody]TransactionViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var trans = Mapper.Map<Transaction>(vm);
                    _repo.AddTransaction(trans, User.GetUserId());


                    if (_repo.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

            return Json(vm);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
