using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;


namespace Finances.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
    }
}