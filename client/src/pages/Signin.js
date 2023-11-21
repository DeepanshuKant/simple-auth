import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {


    const navigation = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        const details = {
            email: email,
            password: password
        }


        const response = await axios.post("http://localhost:4000/users/signin", details, { withCredentials: true }).then((response) => {
            if (response.status === 200) {
                alert("User logged in successfully")
                navigation("/notes");
            }
        }).catch((error) => {
            alert(error.response.data.message)
        })

    }
    return (
        <>

            <form onSubmit={submitHandler}>

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p>Don't have an account? <Link to="/signup" >Signup</Link> </p>
                <input type="submit" value="Signin" />
            </form>

        </>
    )
}

export default Signin