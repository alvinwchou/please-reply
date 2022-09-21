// LogIn.js

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";

function LogIn() {
    const [logInForm, setLogInForm] = useState({
        email: '',
        password: '',
        errorMessage: null
    })

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setLogInForm({ ...logInForm, [itemName]: itemValue })
    }

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginInfo = {
            email: logInForm.email,
            password: logInForm.password,
        }

        signInWithEmailAndPassword(
            auth,
            loginInfo.email,
            loginInfo.password
        ).then(() => {
            // route to events page after successful log in
            navigate('/events');
        }).catch(error => {
            if (error.message) {
                setLogInForm({ ...logInForm, 'errorMessage': error.message })
            } else {
                setLogInForm({ ...logInForm, 'errorMessage': null })
            }
        })
    }

    return (
        <div className="logIn">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Log In</legend>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={logInForm.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={logInForm.password}
                    />
                    {logInForm.errorMessage && <FormError errorMessage={logInForm.errorMessage} />}
                    <button className="btn">Log In</button>
                </fieldset>
            </form>
        </div>
    )
}

export default LogIn