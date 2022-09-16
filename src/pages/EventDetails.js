// EventDetails.js

import { getDatabase, ref, remove } from "firebase/database"
import { Link, useParams } from "react-router-dom"
import firebase from "../firebase"

function EventDetails({ events, userID }) {
    const { eventID: eventID } = useParams();

    const deleteEvent = (whichEvent) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${whichEvent}`)

        remove(dbRef);
    }

    return (
        <div className="eventDetails">
            <h1>Event Details</h1>
            <Link to='/createEvent'>Create Event</Link>
            {events.filter(event => event.eventID == eventID).map(event => {
                return (
                    <div className="eventCard">
                        <p>{event.startDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.endDate}</p>
                        <p>{event.endTime}</p>
                        <p>{event.eventName}</p>
                        <p>{event.location}</p>
                        <br></br>
                        <br></br>
                        <button>Share</button>
                        <button>Edit</button>
                        <button onClick={() => deleteEvent(event.eventID)}>Delete</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Link to={`/signUp/${userID}/${event.eventID}`}>Going</Link>
                        <Link to={`/guestList/${userID}/${event.eventID}`}>Guest List</Link>
                        <p>Details</p>
                        <p>4 people responded</p>
                        <p>Event Created by {userID}</p>
                        <p>{event.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EventDetails