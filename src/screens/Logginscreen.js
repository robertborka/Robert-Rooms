import React, { useState, useEffect } from "react";
import axios from "axios";
function Logginscreen() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    async function Loggin() {

        const user = {
            email,
            password
        }
        try {
            const result = await axios.post('api/users/login', user).data

        } catch (error) {
            console.log(error)

        }
        console.log(user)
    }


    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    <div className="box-shadow">
                        <h2>Loggin</h2>

                        <input type="text" className="form-control" placeholder="email"
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />


                        <button className="btn btn-primary mt-3" onClick={Loggin}>Loggin</button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Logginscreen