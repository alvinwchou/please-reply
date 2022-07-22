// Register.js

import { useEffect, useState } from "react"
import FormError from "../components/FormError";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

function Register({ registerUser }) {
    const [registrationForm, setRegistrationForm] = useState({
        displayName: '',
        email: '',
        passOne: '',
        passTwo: '',
        errorMessage: null
    })

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setRegistrationForm({...registrationForm, [itemName]: itemValue});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const registrationInfo = {
            displayName: registrationForm.displayName,
            email: registrationForm.email,
            password: registrationForm.passOne,
        }

        createUserWithEmailAndPassword(
            auth,
            registrationInfo.email,
            registrationInfo.password
        ).then(() => {
            // pass the displayName back up to App.js so it can hold data at the top level
            registerUser(registrationInfo.displayName);
        }).catch(error => {
            if (error.message) {
                setRegistrationForm({ ...registrationForm, 'errorMessage': error.message })
            } else {
                setRegistrationForm({ ...registrationForm, 'errorMessage': null })
            }
        })
    }

    // check if both passwords are the same
    useEffect(() => {
        if (registrationForm.passOne !== registrationForm.passTwo) {
            setRegistrationForm({ ...registrationForm, 'errorMessage': 'Passwords do not match' })
        } else {
            setRegistrationForm({ ...registrationForm, 'errorMessage': null })
        }
    }, [registrationForm.passOne, registrationForm.passTwo])

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    {registrationForm.errorMessage && <FormError errorMessage={registrationForm.errorMessage}/>}
                    <label htmlFor="displayName">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        placeholder="Display Name"
                        required
                        onChange={handleChange}
                        value={registrationForm.displayName}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={registrationForm.email}
                    />
                    <label htmlFor="passOne">Password</label>
                    <input
                        type="password"
                        name="passOne"
                        id="passOne"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={registrationForm.passOne}
                    />
                    <input
                        type="password"
                        name="passTwo"
                        id="passTwo"
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                        value={registrationForm.passTwo}
                    />
                    <button>Register</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Register