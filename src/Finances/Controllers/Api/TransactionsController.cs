using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;


namespace Finances.Controllers.Api
{

    public class TransactionsController : Controller
    {
        [HttpGet("api/transactions")]
        public JsonResult Get()
        {
            return Json(new {title = "Example"});
        }
    }
}
