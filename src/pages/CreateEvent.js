// CreateEvent.js

import { useEffect, useState } from "react"

function CreateEvent({ addEvent }) {
    const [createEventForm, setCreateEventForm] = useState({
        eventName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        description: ''
    })

    const [currentDate, setCurrentDate] = useState('')

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setCreateEventForm({...createEventForm, [itemName]: itemValue})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        addEvent(createEventForm)

        setCreateEventForm({
            eventName: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            description: ''
        })
    }

    useEffect(() => {
        const now = new Date();

        const year = now.getFullYear();
        const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() +1;
        const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const today = `${year}-${month}-${date}`;

        const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        const minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const time = `${hour}:${minute}`

        setCurrentDate({ ...currentDate, 'today': today, 'time': time})

    }, [])

    return (
        <div className="createEvent">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Create Event</legend>
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        id="eventName"
                        placeholder="Event name"
                        required
                        onChange={handleChange}
                        value={createEventForm.eventName}
                    />
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        min={currentDate.today}
                        required
                        onChange={handleChange}
                        value={createEventForm.startDate}
                    />
                    <label htmlFor="startTime">Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        onChange={handleChange}
                        value={createEventForm.startTime}
                    />
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        min={createEventForm.startDate}
                        onChange={handleChange}
                        value={createEventForm.endDate}
                    />
                    <label htmlFor="endTime">End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        id="endTime"
                        onChange={handleChange}
                        value={createEventForm.endTime}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        required
                        onChange={handleChange}
                        value={createEventForm.description}
                    />
                    <button>Create Event</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CreateEvent