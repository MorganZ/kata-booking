import React, { useEffect, useState, useCallback } from 'react'
import './App.css'
import { BookingApi, RoomApi, } from '../clients/booking/';
import axios from 'axios';
import AddBooking from './components/AddBooking';
import ViewBookings from './components/ViewBookings';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


var clientBooking = new BookingApi(undefined, "https://localhost:5001");
var clientRoom = new RoomApi(undefined, "https://localhost:5001");

function App() {
  const [update, setUpdate] = React.useState(0);
  const [rooms, setRooms] = React.useState([]);
  const [activeRoom, setActiveRoom] = React.useState({ id: "", name: "" });
  const [activeDate, setActiveDate] = React.useState(new Date().toJSON().substring(0, 10));

  useEffect(async () => {
    let response = await clientRoom.apiRoomGet();
    setRooms(response.data as any);
    setActiveRoom(response.data[0]);
  }, []);

  var refreshView = useCallback(async () => {
    setUpdate(update + 1);
  }, [update]);

  var handleChangeRoom = useCallback(async (event: InputEvent) => {
    setActiveRoom({ id: event.target.value, name: event.target.options[event.target.selectedIndex].text });
  }, [setActiveRoom]);

  var handleDateChange = useCallback(async (event: InputEvent) => {
    setActiveDate(event.target.value);
  }, [setActiveDate]);

  return (

    <div className="App"  >
      <div className="d-flex flex-row">
        <div className="p-2"><label htmlFor="roomSelect">reservez la salle</label></div>
        <div className="p-2"><select id="roomSelect" style={{ width: 90 }} className="form-control" value={activeRoom.id} onChange={handleChangeRoom} >
          {rooms.map(((room, index) => (
            <option key={index} value={room.id}>
              {room.name}
            </option>
          )))}
        </select></div>
        <div className="p-2"> <label htmlFor="dateSelect">à la date</label></div>
        <div className="p-2">   <input id="dateSelect" style={{ width: 180 }} className="form-control" value={activeDate} onChange={handleDateChange} type="date"></input>
        </div>
      </div>

      <AddBooking room={activeRoom} date={activeDate} refreshReservation={refreshView}></AddBooking>
      <ViewBookings room={activeRoom} date={activeDate} update={update} ></ViewBookings>
    </div>
  )
}


export default App
