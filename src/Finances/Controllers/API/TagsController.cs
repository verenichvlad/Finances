using System;
using System.Collections.Generic;
using System.Net;
using AutoMapper;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;

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
            catch (Exception ex)
            {
                return Json(false);
            }

            return Json(null);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (_repo.RemoveTag(id) && _repo.SaveAll()) Response.StatusCode = (int)HttpStatusCode.OK;
            else Response.StatusCode = (int)HttpStatusCode.ExpectationFailed;

            return Json(null);
        }

    }
}
