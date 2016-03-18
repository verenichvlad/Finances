using Microsoft.AspNet.Mvc;


namespace Finances.Controllers
{
    public class PartialTemplatesController : Controller
    {
        public IActionResult App() => PartialView();
    }
}