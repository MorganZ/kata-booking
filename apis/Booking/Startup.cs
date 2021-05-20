using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAPI.Infra;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using FluentValidation.AspNetCore;
using Hellang.Middleware.ProblemDetails;
using BookingAPI.Service;

namespace BookingAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers()
                .AddFluentValidation(fv =>
                        {
                            fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                            fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                        });
            services.AddDbContext<BookingContext>();
            services.AddSwaggerGen(c =>
                        {
                            c.SwaggerDoc("v1", new OpenApiInfo { Title = "booking", Version = "v1" });
                        });
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<RoomService>();
            services.AddScoped<BookingService>();
            services.AddCors(options =>
                        {
                            options.AddDefaultPolicy(
                                builder =>
                                {
                                    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
                                });
                        });

            services.AddProblemDetails();

            var context = services.BuildServiceProvider().GetService<BookingContext>();
            context.Database.EnsureCreated();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors();
            app.UseProblemDetails();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "booking v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
