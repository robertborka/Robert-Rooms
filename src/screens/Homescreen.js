import React, { useState, useEffect } from 'react';
import axios from "axios";

function Homescreen() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState()
    const [error, seterror] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true)
                const response = await axios.get('/api/rooms/getallrooms');

                setrooms(response.data)
                setloading(false)
            } catch (error) {
                seterror(true)
                console.log(error)
                setloading(false)
            }
        };

        fetchData();
    }, []); // 

    return (
        <div>

            {loading ? (<h1>Loading....</h1>) : error ? (<h1>Error</h1>) : (rooms.map(room => {

                return <h1>{room.name}</h1>

            }))}

        </div>
    );
}

export default Homescreen;
