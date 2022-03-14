import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Board from './components/Board'
import Register from './components/Register';
import Login from './components/Login';

function getToken() {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    return userToken
}

function App() {
    const [token, setToken] = useState(() => getToken())
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={
                        !token
                            ? <Navigate to="/login" />
                            : <Board token={token}/>
                    } />
                    <Route path="/register" element={<Register setToken={setToken}/>}/>
                    <Route path="/login" element={<Login setToken={setToken}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />,
    </React.StrictMode>,
    document.getElementById('root')
);

