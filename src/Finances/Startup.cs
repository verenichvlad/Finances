using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Finances
{
    public class Startup
    {
        // Add services to the container.
        // Include things in project
        // http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // Configure the HTTP request pipeline.
        // Turning things on
        public void Configure(IApplicationBuilder app)
        {
            app.UseIISPlatformHandler();
            app.UseStaticFiles();

            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Default",
                    template:"{controller}/{action}/{id?}",
                    defaults:new {controller = "App", action ="Index"}
                    );
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
