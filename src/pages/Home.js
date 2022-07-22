// Home.js
import { Link } from "react-router-dom"

function Home({ displayName }) {
    return (
        <div className="home">
            <h1>Please Reply</h1>
            <p>A simple app that allows users to create events and keeps trick of people that RSVP</p>
            {!displayName && 
                <>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Log In</Link>
                </>
            }
        </div>
    )
}

export default Home