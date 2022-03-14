import React from 'react'
import { useNavigate } from 'react-router-dom'

function logoutUser(navigate) {
    localStorage.removeItem('token')
    navigate('/login')
}

function Logout(props) {
    const navigate = useNavigate()
    return (
        <button onClick={() => logoutUser(navigate)}>Log out</button>
    )
}

export default Logout