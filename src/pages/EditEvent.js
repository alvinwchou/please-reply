// EditEvent.js

import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";

function EditEvent({ editEvent, fullName }) {
    const [editEventForm, setEditEventForm] = useState({
        eventName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        description: '',
        host: fullName
    })

    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}`)

        onValue(dbRef, res =>{
            const data = res.val();
            
            setEditEventForm(data)
        })
    }, [])

    const [currentDate, setCurrentDate] = useState('')

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setEditEventForm({...editEventForm, [itemName]: itemValue})
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        editEvent(editEventForm, eventID)

        setEditEventForm({
            eventName: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            location: '',
            description: ''
        })

        navigate('/events')
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
        <div className="editEvent">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Edit Event</legend>
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        id="eventName"
                        placeholder="Event Name"
                        required
                        onChange={handleChange}
                        value={editEventForm.eventName}
                    />
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        min={currentDate.today}
                        required
                        onChange={handleChange}
                        value={editEventForm.startDate}
                    />
                    <label htmlFor="startTime">Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        id="startTime"
                        onChange={handleChange}
                        value={editEventForm.startTime}
                    />
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        min={editEventForm.startDate}
                        onChange={handleChange}
                        value={editEventForm.endDate}
                    />
                    <label htmlFor="endTime">End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        id="endTime"
                        onChange={handleChange}
                        value={editEventForm.endTime}
                    />
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Location"
                        required
                        onChange={handleChange}
                        value={editEventForm.location}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={editEventForm.description}
                    />
                    <button className="btn">Edit Event</button>
                </fieldset>
            </form>
        </div>
    )
}

export default EditEvent