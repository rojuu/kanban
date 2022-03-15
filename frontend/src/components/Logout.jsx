import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    margin-bottom: 1rem;
`

function logoutUser(navigate) {
    localStorage.removeItem('token')
    navigate('/login')
}

function Logout(props) {
    const navigate = useNavigate()
    return (
        <Container>
            <button onClick={() => logoutUser(navigate)}>Log out</button>
        </Container>
    )
}

export default Logout