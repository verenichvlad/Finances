using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;
using Microsoft.AspNet.Authorization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/transactions")]
    public class TransactionsController : Controller
    {
        private readonly IFinancesRepo _repo;
        private readonly IHostingEnvironment _environment;

        public TransactionsController(IFinancesRepo repo, IHostingEnvironment env)
        {
            _repo = repo;
            _environment = env;
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

            return Json(null);
        }

        [HttpPost("upload")]
        public async Task<JsonResult> Upload()
        {
            var files = Request.Form.Files;

            var uploads = Path.Combine(_environment.WebRootPath, "uploads");
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    await file.SaveAsAsync(Path.Combine(uploads, fileName));
                }
            }
            return Json(null);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (_repo.RemoveTransaction(id) && _repo.SaveAll()) Response.StatusCode = (int) HttpStatusCode.OK;
            else Response.StatusCode = (int) HttpStatusCode.ExpectationFailed;

            return Json(null);
        }
    }
}
