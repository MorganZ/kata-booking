using System;
using BookingAPI.Infra;

namespace BookingAPI.Entities{
    public class Room : EntityTyped<Guid>
    {
        public string Name { get; set; }
    }
}