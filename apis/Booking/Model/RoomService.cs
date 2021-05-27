
using System;
using System.Linq;
using BookingAPI.Entities;
using BookingAPI.Infra;

namespace BookingAPI.Service
{
    public class RoomService
    {
        readonly IRepository<Room> _roomRepository;

        public RoomService(IRepository<Room> rooms)
        {
            _roomRepository = rooms;
        }

        public Room getById(Guid id)
        {
            return (from r in _roomRepository.Query() where r.Id == id select r).FirstOrDefault();
        }

        public IQueryable<Room> list()
        {
            return _roomRepository.Query();
        }

        public void add(string name)
        {
            _roomRepository.Add(new Room() { Id = Guid.NewGuid(), Name = name });
            _roomRepository.SaveChanges();
        }
    }
}