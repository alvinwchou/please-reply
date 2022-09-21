// Events.js
import { Link } from "react-router-dom"
import { BsPersonCircle } from "react-icons/bs"

function Events({ events, userID }) {
    return (
        <div className="events">
            <Link to='/createEvent' className="btn">Create Event</Link>
            <h1>Events</h1>

            <div className="eventsGallery">
                {events && events.map(event => {
                    return (
                        <Link to={`/eventDetails/${event.eventID}`} className="eventCard" key={event.eventID}>
                            <p>{new Date(`'${event.startDate}'`).toDateString()}</p>
                            <p className="eventName">{event.eventName}</p>
                            <p>{event.location}</p>
                            <p><BsPersonCircle /> 4 attendees</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Events