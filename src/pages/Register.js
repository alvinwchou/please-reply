// Register.js

import { useEffect, useState } from "react"
import FormError from "../components/FormError";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

function Register({ registerUser }) {
    const [registrationForm, setRegistrationForm] = useState({
        firstName: '',
        lastName: '',
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
            firstName: registrationForm.firstName,
            lastName: registrationForm.lastName,
            fullName: `${registrationForm.firstName} ${registrationForm.lastName}`,
            email: registrationForm.email,
            password: registrationForm.passOne,
        }

        createUserWithEmailAndPassword(
            auth,
            registrationInfo.email,
            registrationInfo.password
        ).then(() => {
            // check for any auth errors
            // pass the firstName back up to App.js so it can hold data at the top level
            registerUser(registrationInfo.fullName);
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                        value={registrationForm.firstName}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                        value={registrationForm.lastName}
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
                    {registrationForm.errorMessage && <FormError errorMessage={registrationForm.errorMessage}/>}
                    <button className="btn">Register</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Register