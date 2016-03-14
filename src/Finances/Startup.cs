using Finances.Models;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;


namespace Finances
{
    public class Startup
    {
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);

        public Startup(IHostingEnvironment env)
        { 
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<FinancesContext>();

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequiredLength = 6;
            })
                .AddEntityFrameworkStores<FinancesContext>();

            services.Configure<CookieAuthenticationOptions>(opt =>
            {
                opt.LoginPath = PathString.FromUriComponent("/Auth/Login");
                //opt.Notifications = new CookieAuthenticationNotifications()
                //{
                //    OnApplyRedirect = ctx =>
                //    {
                //        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                //        {
                //            ctx.Response.StatusCode = 401;
                //        }
                //        else
                //        {
                //            ctx.Response.Redirect(ctx.RedirectUri);
                //        }
                //    }
                //};
            });

            services.AddTransient<FinancesContextSeed>();
        }

        public async void Configure(IApplicationBuilder app,
                              IHostingEnvironment env,
                              ILoggerFactory loggerFactory,
                              FinancesContextSeed seeder)
        {
            app.UseIISPlatformHandler(options =>
                                      options.AuthenticationDescriptions.Clear());
            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routes =>
            {
                routes.MapRoute("default",
                                "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute("spa-fallback",
                                "{*anything}",
                                new { controller = "Home", action = "Index" });
                routes.MapWebApiRoute("defaultApi",
                                      "api/{controller}/{id?}");
            });

            await seeder.EnsureSeedDataAsync();
        }
    }
}