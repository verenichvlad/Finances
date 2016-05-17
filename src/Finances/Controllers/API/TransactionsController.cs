using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;
using System.Linq;
using Finances.Services;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/transactions")]
    public class TransactionsController : Controller
    {
        private readonly IFinancesRepo _repo;
        private readonly IHostingEnvironment _environment;
        private readonly ITransactionImportService _transactionImportService;

        public TransactionsController(IFinancesRepo repo, IHostingEnvironment env, ITransactionImportService transactionImportService)
        {
            _repo = repo;
            _environment = env;
            _transactionImportService = transactionImportService;
        }

        [HttpGet]
        public JsonResult GetCurrentTransactions()
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
            return BasicApiControllerActions.Create(_repo, this, r =>
            {
                var transaction = Mapper.Map<Transaction>(vm);
                _repo.AddTransaction(transaction, User.GetUserId());
            });
        }

        [HttpPost("update")]
        public JsonResult UpdateTransaction([FromBody]TransactionViewModel vm)
        {
            return BasicApiControllerActions.Update(_repo, this, r =>
            {
                var trans = Mapper.Map<Transaction>(vm);
                foreach (var tag in vm.Tags)
                {
                    trans.TransactionTagMaps.Add(new TransactionTagMap()
                    {
                        Tag = tag,
                        Transaction = trans
                    });
                }
                _repo.UpdateTransaction(trans);
            });
        }

        [HttpPost("upload")]
        public JsonResult Upload()
        {
            var files = Request.Form.Files;
            var uploads = Path.Combine(_environment.WebRootPath, "uploads");
            var user = _repo.GetUserById(User.GetUserId());

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    file.SaveAs(Path.Combine(uploads, fileName));
                    if (!_transactionImportService.ImportTransactions(fileName, user)) return Json(false);
                }
            }
            return Json(true);
        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return BasicApiControllerActions.Delete(_repo, this, r => r.RemoveTransaction(id));
        }
    }
}
