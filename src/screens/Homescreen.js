import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

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
        <div className='container'>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : rooms.length > 1 ? (
                    rooms.map(room => {
                        return <div className="col-md-9 mt-3">
                            <Room room={room} />
                        </div>
                    })
                ) : (
                    <Error />

                )}
            </div>
        </div>
    );
}

export default Homescreen;
