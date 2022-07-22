// Navigation.js
import { Link } from "react-router-dom"


function Navigation({ displayName, logoutUser}) {
    return (
        <div className="navigation">
            <Link to='/'>Please Reply</Link>
            <nav>
                {displayName ?
                    <>
                        <p>Welcome, {displayName}</p>
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