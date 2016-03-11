using Finances.Models;
using Glimpse;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Serialization;

namespace Finances
{
    public class Startup
    {
        public static IConfigurationRoot Configuration;

        public Startup(IApplicationEnvironment appEnv)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // Add services to the container.
        // Include things in project
        // http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<FinancesContext>();

            services.AddTransient<FinancesContextSeed>();
            services.AddScoped<IFinancesRepo, FinancesRepo>();
        }

        // Configure the HTTP request pipeline.
        // Turning things on
        public void Configure(IApplicationBuilder app, FinancesContextSeed seed, IHostingEnvironment env)
        {
            app.UseIISPlatformHandler();

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            //app.UseGlimpse();

            app.UseMvc(routes =>
            {
                routes.MapRoute("default",
                                "{controller=App}/{action=Index}/{id?}");
                routes.MapRoute("spa-fallback",
                                "{*anything}",
                                new { controller = "App", action = "Index" });
                routes.MapWebApiRoute("defaultApi",
                                      "api/{controller}/{id?}");
            });
            seed.EnsureSeedData();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
