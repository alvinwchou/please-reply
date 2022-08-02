// GuestList.js

import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";

function GuestList() {
    const { userID: userID } = useParams();
    const { eventID: eventID } = useParams();

    const [guestList, setGuestList] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `events/${userID}/${eventID}/guestList`)

        onValue(dbRef, res => {
            const data = res.val();
            let guestList = [];

            for (let item in data) {
                guestList.push({
                    guestID: item,
                    guestName: data[item].guestName,
                    guestEmail: data[item].guestEmail 
                })
            }

            setGuestList(guestList);
        })
    }, [])

    return (
        <div className="guestList">
            <h1>Guest List</h1>
            {guestList.map(guest => {
                return (
                    <div>
                        <p>{guest.guestName}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default GuestList