// Events.js

import { getDatabase, ref, remove } from "firebase/database"
import { Link } from "react-router-dom"
import firebase from "../firebase"

function Events({ events, userID }) {
    const deleteEvent = (whichEvent) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${whichEvent}`)

        remove(dbRef);
    }

    return (
        <div className="events">
            <h1>Events</h1>
            <Link to='/createEvent'>Create Event</Link>
            {events.map(event => {
                return (
                    <div>
                        <p>{event.startDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.endDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.eventName}</p>
                        <p>{event.location}</p>
                        <Link to={`/signUp/${userID}/${event.eventID}`}>Going</Link>
                        <Link to={`/guestList/${userID}/${event.eventID}`}>Guest List</Link>
                        <p>Share/Delete</p>
                        <button onClick={() => deleteEvent(event.eventID)}>Delete</button>
                        <p>{event.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Events