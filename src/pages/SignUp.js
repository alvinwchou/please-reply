// SignUp.js

import { getDatabase, push, ref } from "firebase/database";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";

function SignUp() {
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: ''
    })

    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setSignUpForm({...signUpForm, [itemName]: itemValue})
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}/attendees`)

        push(dbRef, {
            'attendeeName': signUpForm.name,
            'attendeeEmail': signUpForm.email
        })

        navigate(`/events`)
    }

    return (
        <div className="signUp">
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
                        value={signUpForm.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        required
                        onChange={handleChange}
                        value={signUpForm.email}
                    />
                    <button>Confirm Sign Up</button>
                </fieldset>
            </form>
        </div>
    )
}

export default SignUp