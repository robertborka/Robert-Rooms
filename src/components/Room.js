import React from "react";

function Room ({room})
{
    return (
        <div className='row'>
            <div children="col-md-4">
                <img src={room.imageurls[0]} className='smallimg'/>
            </div>
            <div className="col-md-7">

            </div>
           
        </div>
    )
}

export default Room