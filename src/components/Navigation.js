// Navigation.js
import { Link } from "react-router-dom"
import { MdEvent } from "react-icons/md"


function Navigation({ displayName, logoutUser}) {
    return (
        <div className="navigation">
            <Link to='/'>
                <MdEvent /> Please Reply
            </Link>
            {displayName && <div className="welcome">
                <p>Welcome, {displayName}</p>
            </div> }
            <nav>
                {displayName ?
                    <>
                        <Link to='/events'>Events</Link>
                        <Link to='' onClick={ logoutUser }>Log Out</Link>
                    </>
                :
                    <>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Log In</Link>
                    </>
                }
            </nav>
        </div>
    )
}

export default Navigation