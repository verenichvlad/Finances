using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;

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

        [HttpGet("graph1")]
        public JsonResult GetExpancesGraphData()
        {
            return null;
        }
    }
}
