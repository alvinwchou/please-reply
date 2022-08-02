// Events.js

import { Link } from "react-router-dom"

function Events({ events, userID }) {

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
                        <p>Guest List</p>
                        <p>Share/Delete</p>
                        <p>{event.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Events