using Microsoft.AspNet.Mvc;


namespace Finances.Controllers
{
    public class HybridTemplatesController : Controller
    {
        public IActionResult Header() => PartialView();
    }
}