using Microsoft.AspNet.Mvc;


namespace Finances.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult App() => PartialView();


        public IActionResult Message() => PartialView();

        public IActionResult Numbers() => PartialView();
    }
}