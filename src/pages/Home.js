// Home.js
import { Link } from "react-router-dom"

function Home({ displayName }) {
    return (
        <div className="home">
            <h1>Please Reply</h1>
            <p>Create events and invite your friends to join you. </p>
            <p>One of the best ways to get people involved in your group is to create an event and invite them!</p>
            {!displayName && 
                <div>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Log In</Link>
                </div>
            }
        </div>
    )
}

export default Home