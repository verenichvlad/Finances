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
using Finances.Services;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace Finances.Controllers.API
{
    [Produces("application/json")]
    [Route("api/tags")]
    public class TagsController : Controller
    {

        private readonly IFinancesRepo _repo;

        public TagsController(IFinancesRepo repo)
        {
            _repo = repo;
        }


        [HttpGet]
        public JsonResult GetUserTags()
        {
            IEnumerable<Tag> tags = _repo.GetUserTags(User.GetUserId());

            if (tags == null) return Json(null);

            return Json(Mapper.Map<IEnumerable<TagViewModel>>(tags));
        }

        [HttpPost]
        public JsonResult CreateTag([FromBody]TagViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var tag = Mapper.Map<Tag>(vm);
                    _repo.AddTag(tag, User.GetUserId());


                    if (_repo.SaveAll())
                        Response.StatusCode = (int)HttpStatusCode.Created;
                }
            }
            catch (Exception)
            {
                return Json(false);
            }

            return Json(null);
        }

    }
}
