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
            return Json(Mapper.Map<IEnumerable<UserViewModel>>(user));
        }
    }
}
