// Home.js
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home({ displayName }) {
    let navigate = useNavigate()

    const handelClickDemoAccount = () => {
        const loginInfo = {
            email: 'alvinchou516@gmail.com',
            password: 'asdfasdf',
        }

        signInWithEmailAndPassword(
            auth,
            loginInfo.email,
            loginInfo.password
        ).then(() => {
            // route to events page after successful log in
            navigate('/events');
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="home">
            <h1>Please Reply</h1>
            <p>One of the best ways to get people involved in your group is to create an event and invite them!</p>
            {!displayName && 
                <div className="onboarding">
                    <Link to='/register' className="btn">Register</Link>
                    <Link to='/login' className="btn">Log In</Link>
                </div>
            }
            <div className="demo">
                <a href='https://pleasereply.netlify.app/eventDetails/wqBNP4ZQl6d6fM339idyx6XJLyj1/-NEJ7pjKp5QLxH2IZtvp' className="btn">Demo Event</a>
                <button className="btn" onClick={handelClickDemoAccount}>Demo Account</button>
            </div>
        </div>
    )
}

export default Home