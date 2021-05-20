using System;
using System.Collections.Generic;
using System.Linq;
using BookingAPI.Entities;
using BookingAPI.Infra;

namespace BookingAPI.Service
{

    public class BookingService
    {
        readonly IRepository<Booking> _bookingRepository;
        public BookingService(IRepository<Booking> booking)
        {
            _bookingRepository = booking;
        }

        public Booking getById(Guid id)
        {
            return _bookingRepository.Query().Where(r => r.Id == id).FirstOrDefault();
        }

        public IQueryable<Booking> list()
        {
            return _bookingRepository.Query();
        }

        public IQueryable<Booking> listByDay(Guid roomId, DateTime date)
        {
            return _bookingRepository.Query().Where(r => r.RoomId == roomId && date.Date == r.Start.Date);
        }

        public bool[] RoomSpotsInfoForDay(Guid roomId, DateTime day, Guid bookingId = default(Guid))
        {
            var bookings = (from b in _bookingRepository.Query()
                            where b.RoomId == roomId
                            where b.Id != bookingId
                            where day.Date == b.Start.Date
                            orderby day
                            select new { Start = b.Start.Hour, End = b.Start.Hour + (b.End - b.Start).TotalHours });
            var times = new bool[24];
            foreach (var b in bookings)
            {
                for (int i = b.Start; i < b.End; i++)
                {
                    times[i] = true;
                }
            }
            return times;
        }


        public List<Booking> RoomAvailableSpotsForDay(Guid roomId, DateTime day, Guid bookingId = default(Guid))
        {
            var spotsInfo = this.RoomSpotsInfoForDay(roomId, day);
            var bookingsAvailable = new List<Booking>();
            for (int i = 0; i < 24; i++)
            {
                if (!spotsInfo[i])
                {
                    bookingsAvailable.Add(new Booking
                    {
                        RoomId = roomId,
                        Start = day.Date.AddHours(i),
                        End = day.Date.AddHours(i + 1)
                    });
                }
            }

            return bookingsAvailable;
        }



        // public bool checkNoConflict(Guid roomId, DateTime start, DateTime end, Guid bookingId = default(Guid))
        // {
        //     var spots = availableSpot(roomId, start, bookingId);
        //     for (int i = start.Hour; i < end.Hour; i++)
        //     {
        //         if (spots[i])
        //         {
        //             return false;
        //         }
        //     }
        //     return true;
        // }

        public IEnumerable<Booking> checkNoConflictQuery(Guid roomId, DateTime start, DateTime end, Guid bookingId = default(Guid))
        {
            var conflict = (from b in _bookingRepository.Query()
                            where b.RoomId == roomId
                            where b.Id != bookingId
                            where start < b.End && b.Start < end
                            select b);
            return conflict;
        }

        public Boolean Add(Guid roomId, DateTime start, DateTime end, string userName)
        {
            if (checkNoConflictQuery(roomId, start, end).Count() == 0)
            {
                _bookingRepository.Add(new Booking { RoomId = roomId, Start = start, End = end, UserName = userName });
                return _bookingRepository.SaveChanges() == 1;
            }
            return false;
        }

        public Boolean Update(Guid bookingId, Guid roomId, DateTime start, DateTime end, string userName)
        {
            if (checkNoConflictQuery(roomId, start, end, bookingId).Count() == 0)
            {
                var booking = new Booking
                {
                    Id = bookingId,
                    RoomId = roomId,
                    Start = start,
                    End = end,
                    UserName = userName
                };
                _bookingRepository.Update(booking);
                return _bookingRepository.SaveChanges() == 1;
            }
            return false;
        }

        public bool remove(Guid id)
        {
            var bookingToRemove = getById(id);
            _bookingRepository.Remove(bookingToRemove);
            return _bookingRepository.SaveChanges() == 1;
        }
    }
}