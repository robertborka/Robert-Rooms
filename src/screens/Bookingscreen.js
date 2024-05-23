import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen() {
    const { roomid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();

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
    }, [roomid]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error/>
    }

    return (
        <div className="m-5">
            {room ? (
                <div className="row justify-content-center mt-5 box-shadow">
                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" alt="Room" />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : </p>
                                <p>From Date : </p>
                                <p>To Date : </p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : </p>
                                <p>Rent per day : {room.rentperday}</p>
                                <p>Total amount : </p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>
                            <button className="btn btn-primary">Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default Bookingscreen;
