import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Bookingscreen() {
    const { roomid } = useParams(); // Folosiți useParams pentru a obține roomid
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.post("/api/rooms/getroombyid", { roomid });
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(true);
            }
        };

        fetchRoom();
    }, [roomid]); // Asigurați-vă că useEffect se execută atunci când roomid se schimbă

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching room data.</div>;
    }

    return (
        <div>
            <h1>Booking screen</h1>
            <h1>Room id = {roomid}</h1>
            {room && (
                <div>
                    <h2>{room.name}</h2>
                    <p>{room.description}</p>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
