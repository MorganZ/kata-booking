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
    public class RoomController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly IRepository<Booking> _bookings;
        private readonly IRepository<Room> _rooms;
        private readonly RoomService _roomService;
        public RoomController(RoomService roomService, IRepository<Booking> bookings, IRepository<Room> rooms, ILogger<BookingController> logger)
        {
            _logger = logger;
            _bookings = bookings;
            _rooms = rooms;
            _roomService = roomService;
        }

        [HttpGet()]
        public IEnumerable<Room> GetRooms()
        {
            return _roomService.list();
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("{id}")]
        public ActionResult<Room> GetRoom([FromRoute] Guid id)
        {
            var room = _roomService.getById(id);
            if(room != null ){
                return Ok(room);
            }
            return NotFound();
        }
    }
}
