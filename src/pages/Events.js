// Events.js
import { Link } from "react-router-dom"

function Events({ events, userID }) {
    return (
        <div className="events">
            <h1>Events</h1>
            <Link to='/createEvent'>Create Event</Link>
            {events && events.map(event => {
                return (
                    <Link to={`/eventDetails/${event.eventID}`} className="eventCard" key={event.eventID}>
                        <p>{event.startDate}</p>
                        <p>{event.eventName}</p>
                        <p>{event.location}</p>
                        <p>4 attendees</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Events