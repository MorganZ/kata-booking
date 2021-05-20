using System;
using Xunit;
using System.Linq;
using BookingAPI.Service;
using BookingAPI.Infra;
using BookingAPI.Entities;

namespace BookingTests
{
    public class BookingTest
    {
        private BookingService _bookingService { get; set; }
        private RoomService _roomService { get; set; }

        private Room _currentRoom { get; set; }
        public BookingTest()
        {
            var c = new BookingContext();
            c.Database.EnsureDeleted();
            var rBooking = new Repository<Booking>(c);
            _bookingService = new BookingService(rBooking);
            var rRoom = new Repository<Room>(c);
            _roomService = new RoomService(rRoom);

            _roomService.add("room1");
            _roomService.add("room2");

            _currentRoom = _roomService.list().Where(r => r.Name == "room1").Select(r => r).SingleOrDefault();


        }
        [Fact]
        public void Test1()
        {
            var result = _bookingService.RoomSpotsInfoForDay(_currentRoom.Id, DateTime.Now);
            Assert.False(result.All((r) => r));
        }
        
        [Fact]
        public void When_no_reservation_Return_0_Spot()
        {
            var result = _bookingService.RoomSpotsInfoForDay(_currentRoom.Id, new DateTime(2021, 12, 21));
            Assert.True(result.All((r) => r==false));
        }

        [Fact]
        public void When_2_reservation_Return_Total_3_spots()
        {
            _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 2, 0, 0), new DateTime(2021, 12, 21, 3, 0, 0), "Pierre");
            _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 5, 0, 0), new DateTime(2021, 12, 21, 7, 0, 0), "Pierre");

            var result = _bookingService.RoomSpotsInfoForDay(_currentRoom.Id, new DateTime(2021, 12, 21));
            var count = result.Where(r => r).Count();
            
            Assert.Equal(3, count);
        }

        [Fact]
        public void When_reservation_conflict_Return_False()
        {
            //Given
            var result = _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 6, 0, 0), new DateTime(2021, 12, 21, 8, 0, 0), "Pierre");
            //When
            var result_conflict = _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 5, 0, 0), new DateTime(2021, 12, 21, 7, 0, 0), "Pierre");
            //Then
            Assert.True(result);
            Assert.False(result_conflict);    
            var numberOfReservation = _bookingService.listByDay(_currentRoom.Id,new DateTime(2021, 12, 21)).Count();            
            Assert.True(numberOfReservation == 1);
        }

        [Fact]
        public void Given_reservation_When_reservation_noconflict_Then_Added()
        {
            //Given
            var resultA = _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 6, 0, 0), new DateTime(2021, 12, 21, 7, 0, 0), "Pierre");
            //When
            var resultB = _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 7, 0, 0), new DateTime(2021, 12, 21, 9, 0, 0), "Pierre");
            //Then
            
            Assert.True(resultA);
            Assert.True(resultB);
            var numberOfReservation = _bookingService.listByDay(_currentRoom.Id,new DateTime(2021, 12, 21)).Count();            
            Assert.True(numberOfReservation == 2);
        }

        [Fact]
        public void Given_no_booking_When_booking_all_day_Then_Added()
        {
            //Given
            var numberOfReservation = _bookingService.listByDay(_currentRoom.Id,new DateTime(2021, 12, 21)).Count();            
            Assert.True(numberOfReservation == 0);
            //When
            var resultB = _bookingService.Add(_currentRoom.Id, new DateTime(2021, 12, 21, 0, 0, 0), new DateTime(2021, 12, 22, 0, 0, 0), "Pierre");
            //Then
            Assert.True(resultB);
            Assert.True(_bookingService.RoomSpotsInfoForDay(_currentRoom.Id, new DateTime(2021, 12, 21)).All(r=>r),_bookingService.RoomSpotsInfoForDay(_currentRoom.Id, new DateTime(2021, 12, 21)).Where(r=>r).Count().ToString());
            numberOfReservation = _bookingService.listByDay(_currentRoom.Id,new DateTime(2021, 12, 21)).Count();            
            Assert.True(numberOfReservation == 1);
        }
    }
}
