import React from "react";

function Room ({room})
{
    return (
        <div className='row box-shadow'>
            <div className="col-md-4">
                <img src={room.imageurls[0]} className='smallimg'/>
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <p>Max Count : {room.maxcount}</p>
                <p>Phone Number : {room.phonenumber}</p>
                <p>Type : {room.type}</p>

                <div style={{float: 'right'}}>
                    <button className='btn btn-primary'> View Details</button>
                </div>

            </div>
           
        </div>
    )
}

export default Room