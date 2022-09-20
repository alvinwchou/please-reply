// Home.js
import { Link } from "react-router-dom"

function Home({ displayName }) {
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
        </div>
    )
}

export default Home