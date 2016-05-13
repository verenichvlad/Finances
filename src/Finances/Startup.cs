using AutoMapper;
using Finances.Models;
using Finances.Services;
using Finances.ViewModels;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;


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
            services.AddMvc()
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<FinancesContext>();

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequiredLength = 6;
            })
                .AddEntityFrameworkStores<FinancesContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Cookies.ApplicationCookie.LoginPath = new Microsoft.AspNet.Http.PathString("/Auth/Login");
            });

            services.AddTransient<FinancesContextSeed>();
            services.AddScoped<IFinancesRepo, FinancesRepo>();
            services.AddTransient<ITransactionImportService, TransactionImportService>();
        }




        public async void Configure(IApplicationBuilder app,
                              IHostingEnvironment env,
                              ILoggerFactory loggerFactory,
                              FinancesContextSeed seeder)
        {
            app.UseIISPlatformHandler(options =>
                                      options.AuthenticationDescriptions.Clear());
            app.UseStaticFiles();

            Mapper.Initialize(config =>
            {
                config.CreateMap<Transaction, TransactionViewModel>().ReverseMap();
                config.CreateMap<Tag, TagViewModel>().ReverseMap();
                config.CreateMap<User, UserViewModel>().ReverseMap();
            });

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