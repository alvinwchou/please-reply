// EventDetails.js

import { getDatabase, onValue, ref, remove } from "firebase/database"
import { Link, useNavigate, useParams } from "react-router-dom"
import firebase from "../firebase"
import { FaUsers, FaUser } from "react-icons/fa"
import { ImLocation } from "react-icons/im"
import { useEffect } from "react"
import { useState } from "react"

function EventDetails() {
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

    const navigate = useNavigate()

    const deleteEvent = (whichEvent) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${whichEvent}`)

        remove(dbRef);

        navigate('/events')
    }

    return (
        <div className="eventDetails">
            <div className="eventCard" key={event.eventID}>
                <div className="headingTextContainer">
                    <div className="wrapper">
                                    <h1>Event Details</h1>
                        <h2>{event.eventName}</h2>
                        <h3>{new Date(`'${event.startDate}'`).toDateString()} {event.startTime && `AT ${event.startTime}`} {(event.endDate || event.endTime) && '-'} {event.endDate && new Date(`'${event.endDate}'`).toDateString()} {event.endDate && 'AT'} {event.endTime && `${event.endTime}`}</h3>
                        <h3><span className="grey">{event.location}</span></h3>
                        <div className="eventDetailsOptions">
                            <Link to={`/rsvp/${userID}/${eventID}`} className="btn" >Going</Link>
                            <button className="btn">Invite</button>
                            <button className="btn">Edit</button>
                            <button className="btn" onClick={() => deleteEvent(eventID)}>Delete</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="detailsTextContainer">
                    <h3><span className="bold">Details</span></h3>
                    <p><FaUsers /> 4 people responded <Link to={`/guestList/${userID}/${eventID}`}>Guest List</Link></p>
                    <p><FaUser /> Event Created by <span className="bold">{event.host}</span></p>
                    <p><ImLocation /><span className="bold">{event.location}</span></p>
                    {event.description ? <p>{event.description}</p> : <p><span className="grey">No details yet</span></p>}
                </div>
            </div>
        </div>
    )
}

export default EventDetails