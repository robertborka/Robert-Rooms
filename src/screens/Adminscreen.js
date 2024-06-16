import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Adminscreen() {
    return (
        <div className="mt-3 ml-3 mr-3 box-shadow">
            <h6 className="text-center"><b>Admin Panel</b></h6>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <h1>Add Room</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <h1>Users</h1>
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
                {bookings.length ? (
                    <h3>There are total {bookings.length} bookings</h3>
                ) : (
                    !loading && <h3>No bookings available</h3>
                )}
            </div>
        </div>
    );
}
