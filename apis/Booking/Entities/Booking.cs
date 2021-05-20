using System;
using BookingAPI.Infra;

namespace BookingAPI.Entities{
    public class Booking : EntityTyped<Guid>
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Guid RoomId { get; set; }
        public string UserName { get; set; }
        public int duration { get {
            return (int)((this.End-this.Start).TotalMinutes);
        } }
    }
}