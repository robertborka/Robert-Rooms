import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from "moment";

const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, setduplicaterooms] = useState([]);
    const [searchkey, setsearchkey] = useState('');
    const [type, settype]=useState('all');



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                setduplicaterooms(response.data)
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
        const fromDate = dates[0] ? dates[0].format('DD-MM-YYYY') : null;
        const toDate = dates[1] ? dates[1].format('DD-MM-YYYY') : null;
    
        setfromdate(fromDate);
        settodate(toDate);
    
        const filteredRooms = duplicaterooms.filter(room => {
            const overlappingBookings = room.currentbookings.some(booking => {
                const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY');
                const bookingToDate = moment(booking.todate, 'DD-MM-YYYY').format('DD-MM-YYYY');
                const isOverlapping =
                    (bookingFromDate <= fromDate && bookingToDate >= fromDate) ||
                    (bookingFromDate <= toDate && bookingToDate >= toDate) ||
                    (bookingFromDate >= fromDate && bookingToDate <= toDate);
                return isOverlapping;
            });
    
            return !overlappingBookings;
        });
    
        setRooms(filteredRooms);
    }

    function filterBySearch(){

        const tepmrooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

        setRooms(tepmrooms);

    }

    function filterByType(e){

        settype(e)

        if(e!=='all'){
            const tepmrooms = duplicaterooms.filter(room => room.type.toLowerCase()==e.toLowerCase())

        setRooms(tepmrooms);
        }
        else{
            setRooms(duplicaterooms);
        }

    }
    
    return (
        <div className='container'>

            <div className='row mt-5 box-shadow'>

                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

                </div>
                <div className='col-md-5'>
                    <input type='text' className='form-control' placeholder='search rooms'
                    value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
                    />

                </div>

                <div>

                <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
                </div>

            </div>



            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : (
                    rooms.map(room => {
                        return <div className="col-md-9 mt-3">
                            <Room room={room} fromdate={fromdate} todate={todate} />
                        </div>
                    
                    })
                ) }
            </div>
        </div>
    );
}

export default Homescreen;