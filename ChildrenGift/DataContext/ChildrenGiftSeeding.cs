using ChildrenGift.Models.Entities;
using FizzWare.NBuilder;
using Microsoft.EntityFrameworkCore;
using System;

namespace ChildrenGift.DatContext
{
    public static class ChildrenGiftSeeding
    {
        public static void SeedData(ModelBuilder modelBuilder)
        {
            Random rnd = new Random();
            var childern = Builder<Child>.CreateListOfSize(100)
                .All()
                .With(m => m.FirstName = Faker.Name.First())
                .With(m => m.LastName = Faker.Name.Last())
                .Build();

            modelBuilder.Entity<Child>().HasData(childern);

            var gift = Builder<Gift>.CreateListOfSize(250)
                .All()
                .With(m => m.Name = Faker.Lorem.GetFirstWord())
                .With(m => m.ChildId = rnd.Next(1, 100))
                .Build();

            modelBuilder.Entity<Gift>().HasData(gift);

        }
    }
}
