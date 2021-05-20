
using System;
using System.Linq;
using BookingAPI.Entities;
using BookingAPI.Infra;

namespace BookingAPI.Service
{
    public class RoomService
    {
        readonly IRepository<Room> roomsRepository;

        public RoomService(IRepository<Room> rooms)
        {
            roomsRepository = rooms;
        }

        public Room getById(Guid id)
        {
            return (from r in roomsRepository.Query() where r.Id == id select r).FirstOrDefault();
        }

        public IQueryable<Room> list()
        {
            return roomsRepository.Query();
        }

        public void add(string name)
        {
            roomsRepository.Add(new Room() { Id = Guid.NewGuid(), Name = name });
            roomsRepository.SaveChanges();
        }
    }
}