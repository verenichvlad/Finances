using System;
using System.Net;
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

        [HttpPost]
        public JsonResult ChangeUser([FromBody]UserViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = Mapper.Map<User>(vm);
                    _repo.ChangeUser(user, User.GetUserId());


                    if (_repo.SaveAll())
                        Response.StatusCode = (int)HttpStatusCode.Created;
                }
            }
            catch (Exception ex)
            {
                return Json(false);
            }

            return Json(null);
        }
    }
}
