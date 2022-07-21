// Navigation.js
import { Link } from "react-router-dom"


function Navigation() {
    return (
        <div className="navigation">
            <Link to='/'>Please Reply</Link>
            <nav>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Log In</Link>
            </nav>
        </div>
    )
}

export default Navigation