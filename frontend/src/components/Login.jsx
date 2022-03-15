import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const OuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const InnerContainer = styled.div`
    margin-top: 3rem;
    border-radius: 3px;
    width: 15rem;
    background-color: #ebecf0;
    padding: 1rem;
`

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        loginUser().then(data => {
            props.setToken(data.access_token)
            localStorage.setItem('token', JSON.stringify(data.access_token))
            navigate('/')
        })
    }

    async function loginUser() {
        const searchParams = new URLSearchParams()
        searchParams.append('username', username)
        searchParams.append('password', password)

        const response = await fetch('/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString()
        })
        return await response.json()
    }

    return (
        <OuterContainer>
            <InnerContainer>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <p>
                        UserName <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                    </p>
                    <p>
                        Password <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </p>
                    <p>
                        <button>Login</button>
                    </p>
                    <p>
                        Need an account?<br/><Link to='/register'>Register here</Link>
                    </p>
                </form>
            </InnerContainer>
        </OuterContainer>
    )
}

export default Login