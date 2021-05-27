

import React, { useEffect, useState, useCallback } from 'react'
import { BookingApi, RoomApi, } from '../../clients/booking';
import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const clientBooking = new BookingApi(undefined, "https://localhost:5001");

function AddBooking({ room, date, refreshReservation }) {
    const [errorsDisplay, setErrorsDisplay] = React.useState("");

    const addBooking = (event: InputEvent) => {
        setErrorsDisplay("");
        const startHour = document.getElementById("startHour").value;
        const endHour = document.getElementById("endHour").value;

        const booking = {
            roomId: room.id,
            start: new Date(new Date(date + "Z").setUTCHours(startHour)).toJSON(),
            end: new Date(new Date(date + "Z").setUTCHours(endHour)).toJSON(),
            userName: document.getElementById("username").value
        };

        clientBooking.apiBookingAddPost(booking).then(() => {
        }).catch((error) => {
            const errors = error.response.data.errors;
            if (errors) {
                setErrorsDisplay(JSON.stringify(errors));
            }
        }).finally(() => {
            refreshReservation();
        });
    };

    return (
        <div>
            <div className="d-flex flex-row">
                <div className="p-2"> utilisateur</div>
                <div className="p-2"> <input placeholder="marion" className="form-control" id="username" type="input"></input></div>
                <div className="p-2"> à partir de</div>
                <div className="p-2"> <input className="form-control" id="startHour" min="0" max="23" type="number"></input></div>
                <div className="p-2">  à </div>
                <div className="p-2">   <input className="form-control" id="endHour" min="1" max="24" type="number"></input>
                </div>
                <div className="p-2">  <button className="btn btn-primary" onClick={addBooking}>Reservez</button>
                </div>

            </div>
            {errorsDisplay ? <div className="alert alert-danger" role="alert">
                {errorsDisplay}
            </div> : null}

        </div>
    )
}

export default AddBooking
