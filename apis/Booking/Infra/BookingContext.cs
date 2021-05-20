using BookingAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;

namespace BookingAPI.Infra
{
    public class BookingContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseInMemoryDatabase("booking");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasOne<Room>()
                .WithMany()
                .HasForeignKey(b => b.RoomId)
                .IsRequired();

            for (int i = 0; i < 10; i++)
            {
                var roomId = Guid.NewGuid();
                modelBuilder.Entity<Room>().HasData(new Room { Id = roomId, Name = "room" + i });
                // for(int j = 0; j<24; j=j+2){
                //     if(new Random().NextDouble()>0.5){
                //         modelBuilder.Entity<Booking>().HasData(new Booking { Id = Guid.NewGuid(),RoomId= roomId ,Start = DateTime.Now.Date.AddHours(j), End = DateTime.Now.Date.AddHours(j+2), UserName= "Pierre" });
                //     }
                // }
            }

          
        }
    }
}

