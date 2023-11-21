import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/actions/userAction'

const Signup = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    const userReducer = useSelector(state => state.user);

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        const details = {
            username: username,
            email: email,
            password: password
        }


        // const response = await axios.post("http://localhost:4000/users/signup", details, { withCredentials: true }).then((response) => {
        //     if (response.status === 200) {

        //         console.log(response.data)
        //         alert("User Signup successfully, Please login to get into your account")
        //         navigation("/signin");
        //     }
        // }).catch((error) => {
        //     alert(error.response.data.message)
        // })

        dispatch(registerUser(details));
    }


    useEffect(() => {

        if (userReducer.isAuthenticated) {
            navigation("/signin");
            // redirect("/notes")
            // history.push("/signin")
        }


        console.log(userReducer)

    }, [dispatch, userReducer.isAuthenticated, alert])


    useEffect(() => {

        if (userReducer.isAuthenticated) {
            navigation("/notes");
        }


    }, [userReducer.success])

    return (
        <>

            <form onSubmit={submitHandler}>

                <input type="text" placeholder="username" value={username} onChange={(e) => setUserName(e.target.value)} />
                <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p>Already have Account!? <Link to="/signin" >Signin</Link> </p>
                <input type="submit" value="Signup" />
            </form>

        </>
    )
}

export default Signup