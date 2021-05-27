



import React, { useEffect, useState, useCallback } from 'react'
import { BookingApi, RoomApi, } from '../../clients/booking';
import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const clientBooking = new BookingApi(undefined, "https://localhost:5001");

function ViewBookings({ room, date, update }) {
    const [bookings, setBookings] = React.useState([]);
    const spotSize = 26;

    useEffect(async () => {
        if (!room.id) return;
        const response = await clientBooking.apiBookingGet(room.id, new Date(date).toJSON());
        setBookings(response.data as any);
    }, [room, date, update])

    const remove = async function (id){
        await clientBooking.apiBookingRemovePost(id);
        const response = await clientBooking.apiBookingGet(room.id, new Date(date).toJSON());
        setBookings(response.data as any);
    };

    return (
        <div className="alert alert-primary" style={{ margin:"auto",padding:0, borderRadius:4 , position: "relative", height: 24 * spotSize, width: 254 }}>
            {bookings.map(((booking, index) => (
                <div  className="alert alert-success" key={index} style={{borderRadius:4 ,
                    padding:0,
                    boxSizing: "border-box",position: "absolute",
                    width: 250,
                    top: new Date(booking.start).getUTCHours() * spotSize,
                    height: booking.duration/60*spotSize
                }} >
                    {booking.userName} de {new Date(booking.start).getUTCHours()} à {new Date(booking.end).getUTCHours()}
                    <button type="button" className="btn-close" aria-label="Close"  onClick={()=>remove(booking.id)}></button>
                </div>
            )))}
        </div>
    )
}

export default ViewBookings
