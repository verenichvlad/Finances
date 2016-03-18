using System.Threading.Tasks;
using Finances.Models;
using Finances.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;

namespace Finances.Controllers
{
    public class AuthController : Controller
    {
        private SignInManager<User> _signInManager;

        public AuthController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)  return RedirectToAction("Index", "Home");

            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel vm, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(vm.Username, vm.Password, true, false);

                if (signInResult.Succeeded)
                    if (string.IsNullOrWhiteSpace(returnUrl)) return RedirectToAction("Index", "Home");
                    else return Redirect(returnUrl);
                else ModelState.AddModelError("", "Login failed");
            }
            return View();
        }

        public async Task<ActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated) await _signInManager.SignOutAsync();

            return RedirectToAction("Index", "Home");
        }
    }
}
