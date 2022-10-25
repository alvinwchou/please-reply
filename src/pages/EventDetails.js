// EventDetails.js

import { getDatabase, onValue, ref, remove } from "firebase/database"
import { Link, useNavigate, useParams } from "react-router-dom"
import firebase from "../firebase"
import { FaUsers, FaUser } from "react-icons/fa"
import { ImLocation } from "react-icons/im"
import { useEffect } from "react"
import { useState } from "react"
import ModalInviteLink from "../components/ModalInviteLink"

function EventDetails({currentUserID}) {
    const [event, setEvent] = useState([])
    const [showGuestList, setShowGuestList] = useState(false)
    const [showInviteLink, setShowInviteLink] = useState(false)

    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}`)

        onValue(dbRef, res =>{
            const data = res.val();

            //creating an array of guest names
            let guestListNames = [];
            for (const key in data.guestList) {
                guestListNames.push(data.guestList[key].guestName)
            }
            
            setEvent({...data, guestListNames: guestListNames})
        })
    }, [])

    const navigate = useNavigate()

    const deleteEvent = (whichEvent) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${whichEvent}`)

        remove(dbRef);

        navigate('/events')
    }

    const handleClick = () => {
        setShowGuestList(!showGuestList)
    }

    return (
        <div className="eventDetails">
            <div className="eventCard">
                <div className="headingTextContainer">
                    <div className="wrapper">
                                    <h1>Event Details</h1>
                        <h2>{event.eventName}</h2>
                        <h3>{new Date(`'${event.startDate}'`).toDateString()} {event.startTime && `AT ${event.startTime}`} {(event.endDate || event.endTime) && '-'} {event.endDate && new Date(`'${event.endDate}'`).toDateString()} {event.endDate && event.endTime && 'AT'} {event.endTime && `${event.endTime}`}</h3>
                        <h3><span className="grey">{event.location}</span></h3>
                        <div className="eventDetailsOptions">
                            {currentUserID !== userID &&
                                <Link to={`/rsvp/${userID}/${eventID}`} className="btn" >Going</Link>
                            }
                            <button className="btn" onClick={() => {
                                // setShowInviteLink(!showInviteLink)
                                // remove below when we have emails working
                                setShowInviteLink(true)
                                navigator.clipboard.writeText(`https://pleasereply.netlify.app/eventDetails/${userID}/${eventID}`)
                                setTimeout(() => setShowInviteLink(false), 1500)
                                }}>Invite</button>
                            {currentUserID === userID && <>
                                {/* <Link to={`/guestList/${userID}/${eventID}`} className="btn">Guest List</Link> */}
                                <Link to={`/eventDetails/${userID}/${eventID}/edit`} className="btn">Edit</Link>
                                <button className="btn" onClick={() => deleteEvent(eventID)}>Delete</button>
                            </>
                            }
                        </div>
                        
                    </div>
                </div>
                <br></br>
                <div className="detailsContainer">
                    <div>
                        <div className="detailsTextContainer">
                            <h3><span className="bold">Details</span></h3>
                            <p className="responded" onClick={handleClick}><FaUsers />{event.guestList ? Object.keys(event.guestList).length : "0"} responded</p>
                            {showGuestList && event.guestListNames.length !== 0 && <div className="guestList">
                                    {event.guestListNames && event.guestListNames.map(guestName => {
                                        return (
                                            <p>{guestName}</p>
                                        )
                                    })}
                                </div>
                            }
                            <p><FaUser />Event Created by <span className="bold">{event.host}</span></p>
                            <p><ImLocation /><span className="bold">{event.location}</span></p>
                            {event.description ? <p>{event.description}</p> : <p><span className="grey">No details yet</span></p>}
                        </div>
                    </div>
                    <div className="detailsMapContainer">
                        <iframe src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${event.location}`}></iframe>
                    </div>
                </div>
            </div>
            {showInviteLink && <ModalInviteLink userID={userID} eventID={eventID} />}
        </div>
    )
}

export default EventDetails