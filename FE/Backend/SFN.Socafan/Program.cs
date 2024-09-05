using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProtoBuf.Meta;
using SFN.Socafan.Database;
using SFN.Socafan.Database.DataAccess;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string key = "989471E25FBC2848D6BF3BB32F4D1"; // Replace with your actual secure key of at least 128 bits (16 bytes)
var keyBytes = Encoding.UTF8.GetBytes(key);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SFNDbContext>(options =>
    options.UseSqlite("Data Source=library.db", b => b.MigrationsAssembly("SFN.Socafan.API")));
builder.Services.AddScoped<EntryDataAccess>();
builder.Services.AddScoped<AuthorizationDataAccess>();
builder.Services.AddScoped<AdminDataAccess>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        //ValidIssuer = "yourdomain.com",
        //ValidAudience = "yourdomain.com",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mM2+z$e0:+MS>?8zy^VDIUB+9Lh%:w]br03QoRDNhUdzW;*$X\"AuxU6'=u,G$_b"))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Replace with your Angular app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
