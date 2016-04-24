using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/settings")]
    public class SettingsController : Controller
    {
        private IFinancesRepo _repo;

        public SettingsController(IFinancesRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("user")]
        public JsonResult GetCurrentUser()
        {
            User user = _repo.GetUserById(User.GetUserId());
            return Json(Mapper.Map<UserViewModel>(user));
        }
    }
}
