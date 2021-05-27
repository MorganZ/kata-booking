using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAPI.Entities;
using BookingAPI.Infra;
using BookingAPI.Model;
using BookingAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly RoomService _roomService;
        private readonly BookingService _bookingService;
        public BookingController(RoomService roomService, BookingService bookingService, ILogger<BookingController> logger)
        {
            _logger = logger;
            _roomService = roomService;
            _bookingService = bookingService;
        }

        [HttpGet()]
        public IEnumerable<Booking> GetByRoomAndDate(Guid roomId, DateTime date)
        {
            return _bookingService.listByDay(roomId, date);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [HttpPost("add")]
        public IActionResult Add(AddBookingDTO booking)
        {
            if (_bookingService.Add(booking.RoomId, booking.Start, booking.End, booking.UserName))
            {
                return Ok();
            }

            var problems = new ProblemDetails()
            {
                Type = "conflict",
                Title = "conflict detected",
            };

            problems.Extensions.Add("errors", new Dictionary<string, List<string>>()
            {
                ["conflics"] = new List<string>() { "Booking conflict with another Booking" }
            });

            problems.Extensions.Add("conflic", _bookingService.checkNoConflictQuery(booking.RoomId, booking.Start, booking.End));
            problems.Extensions.Add("availables", _bookingService.RoomAvailableSpotsForDay(booking.RoomId, booking.Start));

            return BadRequest(problems);
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("remove")]
        public IActionResult Remove(Guid bookingId)
        {
            if (_bookingService.remove(bookingId))
            {
                return Ok();
            }
            return NotFound();
        }

        // [HttpPost("udpate")]
        // public IActionResult Update(UpdateBookingDTO booking)
        // {
        //     _bookingService.Update(booking.Id, booking.RoomId, booking.Start, booking.End, booking.UserName);
        //     return Ok();
        // }
    }
}
