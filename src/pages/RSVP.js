// RSVP.js

import axios from "axios";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";

function RSVP() {
    const [rsvpForm, setRsvpForm] = useState({
        name: '',
        email: ''
    })
    const [event, setEvent] = useState([])

    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}`)

        onValue(dbRef, res =>{
            const data = res.val();
            setEvent(data)
        })
    }, [])

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setRsvpForm({...rsvpForm, [itemName]: itemValue})
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/send_mail", {
            text: rsvpForm.name
        }).then(res => {
            // if email was successfully sent then append name to guestList
            console.log('message Sent', res)
            const database = getDatabase(firebase);
            const dbRef = ref(database, `events/${userID}/${eventID}/guestList`)

            push(dbRef, {
                'guestName': rsvpForm.name,
                'guestEmail': rsvpForm.email
            })

            navigate(`/events`)
        }).catch(err => console.log('message not sent',err))
	}

    return (
        <div className="rsvp">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>RSVP</legend>
                    <div className="rsvpFromHeader">
                        <p>{new Date(`'${event.startDate}'`).toDateString()}</p>
                        <p className="eventName">{event.eventName}</p>
                        <p>{event.location}</p>
                    </div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        value={rsvpForm.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={rsvpForm.email}
                    />
                    <button className="btn">Confirm RSVP</button>
                </fieldset>
            </form>
        </div>
    )
}

export default RSVP