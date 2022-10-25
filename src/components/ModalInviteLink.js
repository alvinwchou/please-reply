// ModalInviteLink.js

function ModalInviteLink({userID, eventID}) {
    const handleClick = () => {
        navigator.clipboard.writeText(`https://pleasereply.netlify.app/eventDetails/${userID}/${eventID}`)
    }
    return (
        <div className="modalInviteLink">
            <div className="modalInviteLinkContainer">
                {/* <p>https://pleasereply.netlify.app/eventDetails/{userID}/{eventID}</p> */}
                {/* <button className="btn" onClick={handleClick}>Copy Link</button>
                <button className="btn" disabled>Email</button> */}
                <p>Event URL has been copied</p>
            </div>
        </div>
    )
}

export default ModalInviteLink