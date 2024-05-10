import React, { useState, useEffect } from 'react';
import axios from "axios";

function Homescreen() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); 
    }, []); // 

    return (
        <div>
            <h1>Home screen</h1>
            <h1>There are a total of {rooms.length} rooms</h1>
        </div>
    );
}

export default Homescreen;
