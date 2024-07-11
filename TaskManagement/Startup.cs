
using Microsoft.EntityFrameworkCore;
using LAPR5.Infrastructure;
using LAPR5.Domain.Shared;
using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;

namespace LAPR5
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();

            services.AddDbContext<LAPR5DbContext>(opt =>
                 opt.UseNpgsql(
                         connectionString: "Host=localhost;Database=dbapi;Username=admin;Password=123")
                 .UseLazyLoadingProxies());

            ConfigureMyServices(services);
            services.AddSwaggerGen();
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<Adapter>();
            services.AddTransient<IPickUpDeliveryTaskRepository, PickUpDeliveryRepository>();
            services.AddTransient<PickUpDeliveryService>();
            services.AddTransient<IVigilanceTaskRepository, VigilanceRepository>();
            services.AddTransient<VigilanceService>();
        }
    }
}
