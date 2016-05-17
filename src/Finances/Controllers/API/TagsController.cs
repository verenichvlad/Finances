using System.Collections.Generic;
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
            return BasicApiControllerActions.Create(_repo, this, r =>
            {
                var tag = Mapper.Map<Tag>(vm);
                _repo.AddTag(tag, User.GetUserId());
            });                                                          
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return BasicApiControllerActions.Delete(_repo, this, r => r.RemoveTag(id));
        }

    }
}
