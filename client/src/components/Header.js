import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <ul>
                <li><Link to="/signup" >Signup</Link></li>
                <li><Link to="/signin" >Signin</Link></li>
            </ul>

        </>
    )
}

export default Header