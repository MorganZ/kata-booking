
using System;
using BookingAPI.Service;
using FluentValidation;

namespace BookingAPI.Model
{
    public class AddBookingDTO
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string UserName { get; set; }
        public Guid RoomId { get; set; }
    }

    public class UpdateBookingDTO : AddBookingDTO
    {
        public Guid Id { get; set; }
    }

    public class AddReservationValidator : AbstractValidator<AddBookingDTO>
    {
        public AddReservationValidator()
        {
            RuleFor(x => x.End)
                .GreaterThan(x => x.Start);
            RuleFor(x=>x.UserName).NotEmpty().Length(2, 50);
        }
    }
}