// Attending.js

import { getDatabase, push, ref } from "firebase/database";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";

function Attending() {
    const [attendingForm, setAttendingForm] = useState({
        name: '',
        email: ''
    })

    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setAttendingForm({...attendingForm, [itemName]: itemValue})
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}/guestList`)

        push(dbRef, {
            'guestName': attendingForm.name,
            'guestEmail': attendingForm.email
        })

        navigate(`/events`)
    }

    return (
        <div className="attending">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Sign Up</legend>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        value={attendingForm.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        required
                        onChange={handleChange}
                        value={attendingForm.email}
                    />
                    <button>Confirm Sign Up</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Attending