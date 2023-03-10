using ChildrenGift.DatContext;
using ChildrenGift.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IChildrenRepository, ChildrenRepository>();
builder.Services.AddScoped<IGiftRepository, GiftRepository>();
builder.Services.AddDbContext<ChildGiftContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ChildGiftDatabase"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
