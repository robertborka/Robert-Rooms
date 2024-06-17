import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { max } from "moment";
import Swal from "sweetalert2";

function Adminscreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
        }

    }, []);
    return (
        <div className="mt-3 ml-3 mr-3 box-shadow">
            <h6 className="text-center"><b>Admin Panel</b></h6>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/bookings/getallbookings");
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-10">
                <h3>Bookings</h3>
                {loading && <Loader />}
                {error && <Error message={error.message} />}
                <table className="table table-bordered table-dark">
                    <thead className="box-shadow">
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>



                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>

                            </tr>
                        }))}

                    </tbody>
                </table>

            </div>
        </div>
    );
}

export function Rooms() {
    const [rooms, setrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/rooms/getallrooms");
                setrooms(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-10">
                <h3>Rooms</h3>
                {loading && <Loader />}
                {error && <Error message={error.message} />}
                <table className="table table-bordered table-dark">
                    <thead className="box-shadow">
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>



                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>

                            </tr>
                        }))}

                    </tbody>
                </table>

            </div>
        </div>
    );
}

export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/getallusers");
                setusers(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="col-md-10">
                <h3>Users</h3>
                {loading && <Loader />}
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User name</th>
                            <th>User Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>

                            </tr>
                        }))}
                    </tbody>

                </table>
            </div>
        </div>
    )

}

export function Addroom() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdescription] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [type, settype] = useState()
    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()
    const [imageurl3, setimageurl3] = useState()

    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }

        try {
            setLoading(true)
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', "Your New Room Added Succesfully", 'success').then(result => {
                window.location.href = '/home'
            })


        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oops', "Something went wrong", 'error')

        }
    }

    return (
        <div className="row">
            <div className="col-md-5">
                {loading && <Loader />}

                <input type="text" className="form-control" placeholder="room name"
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="rent per day"
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="max count"
                    value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="description"
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="phone number"
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />


            </div>

            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="type"
                    value={type} onChange={(e) => { settype(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="Image URL 1"
                    value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="Image URL 2"
                    value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }}
                />
                <input type="text" className="form-control" placeholder="Image URL 3"
                    value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }}
                />

                <div className="text-right">

                    <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>

                </div>

            </div>

        </div>
    )
}