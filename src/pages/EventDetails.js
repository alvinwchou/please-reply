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
            {events && events.filter(event => event.eventID == eventID).map(event => {
                return (
                    <div className="eventCard" key={event.eventID}>
                        <h3>{new Date(`'${event.startDate}'`).toDateString()} AT {event.startTime} - {new Date(`'${event.endDate}'`).toDateString()} AT {event.endTime}</h3>
                        
                        <h2>{event.eventName}</h2>
                        <h3>{event.location}</h3>
                        <br></br>
                        <br></br>
                        <Link to={`/signUp/${userID}/${event.eventID}`} className="btn" >Going</Link>
                        <button className="btn">Invite</button>
                        <button className="btn">Edit</button>
                        <button className="btn" onClick={() => deleteEvent(event.eventID)}>Delete</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        
                        <h3><span className="bold">Details</span></h3>
                        <p>4 people responded <Link to={`/guestList/${userID}/${event.eventID}`}>Guest List</Link></p>
                        <p>Event Created by <span className="bold">{userID}</span></p>
                        <p><span className="bold">{event.location}</span></p>
                        <p>{event.description ? event.description : 'No details yet'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EventDetails