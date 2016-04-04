using System.Collections.Generic;
using System.Net;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;

namespace Finances.Controllers.API
{
    [Route("api/plan")]
    public class PlanController : Controller
    {
        public IFinancesRepo _repo { get; set; }

        public PlanController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            //var result = _repo.GetCurrentPlan();
            return new JsonResult(false);
        }

        [HttpPost("")]
        public JsonResult Post([FromBody] PlanViewModel plan)
        {
            if (ModelState.IsValid)
            {
                Response.StatusCode = (int)HttpStatusCode.Created;
                return Json(true);
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Failure");
        }
    }
}
