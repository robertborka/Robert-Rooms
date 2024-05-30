import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';

function Bookingscreen() {
    const { roomid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();

    const fromdateMoment = moment(fromdate, 'DD-MM-YYYY');
    const todateMoment = moment(todate, 'DD-MM-YYYY');

    console.log("From date:", fromdateMoment);
    console.log("To date:", todateMoment);
    const totaldays = todateMoment.diff(fromdateMoment, 'days');

    const totalamount = room ? totaldays * room.rentperday : null;


    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true)
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
        return <Error />
    }

    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)

        } catch (error) {

        }
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
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>From Date : {fromdate} </p>
                                <p>To Date : {todate} </p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days : {totaldays}</p>
                                <p>Rent per day : {room.rentperday}</p>
                                <p>Total amount : {totalamount} </p>
                            </b>
                        </div>

                        <div style={{ float: 'right' }}>

                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency="RON"
                                stripeKey="pk_test_51PM637EUZMjP2QLVHpYvpkCbaLGPmq4g5AueEv5fxbqB5j2wWwpASD8XnbQLLb6F8NohxA4QeeCXDMtPwjCj6kpq00AXepRNlZ"
                            >
                                <button className="btn btn-primary">Pay Now</button>
                            </StripeCheckout>
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
