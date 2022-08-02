// Events.js

function Events({ events }) {

    return (
        <div className="events">
            <h1>Events</h1>
            {events.map(event => {
                return (
                    <div>
                        <p>{event.startDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.endDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.eventName}</p>
                        <p>{event.location}</p>
                        <p>Going</p>
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