import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment';




const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();


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

    function filterByDate(dates) {

        console.log((dates[0].format('DD-MM-YYYY')))
        console.log((dates[1].format('DD-MM-YYYY')))
        setfromdate((dates[0].format('DD-MM-YYYY')))
        settodate((dates[1].format('DD-MM-YYYY')))




    }


    return (
        <div className='container'>

            <div className='row mt-5'>

                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

                </div>

            </div>



            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : rooms.length > 1 ? (
                    rooms.map(room => {
                        return <div className="col-md-9 mt-3">
                            <Room room={room} fromdate={fromdate} todate={todate} />
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
