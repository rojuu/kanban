import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        createUser().then(data => {
            props.setToken(data.access_token)
            localStorage.setItem('token', JSON.stringify(data.access_token))
            navigate('/')
        })
    }

    async function createUser() {
        const formData =  {
            username: username,
            password: password,
        }

        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        return await response.json()
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                UserName <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            </p>
            <p>
                Password <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </p>
            <p>
                <button>Register</button>
            </p>
            <p>
                Already have an account? <Link to='/login'>Login here</Link>
            </p>
        </form>
    )
}

export default Register