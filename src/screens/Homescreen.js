import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="row">
                {loading ? (
                    <h1>Loading....</h1>
                ) : error ? (
                    <h1>Error</h1>
                ) : (
                    rooms.map(room => {
                        return <div className="col-md-9">
                            <Room room={room}/>
                        </div>
                    })
                )}
            </div>
        </div>
    );
}

export default Homescreen;
