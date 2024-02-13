import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom'
import wechat from '../assets/wechat.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { loginRoute } from '../utils/api'

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if(localStorage.getItem('chat-app-user')) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()) {
            const { username, password } = values
            const { data } = await axios.post(loginRoute, {
                username,
                password
            })
            if(data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate("/")
            }
        }
    }

    const handleValidation = () => {
        const { username, password } = values
        if(username === "" || password === "") {
            toast.error("Email and Password are required!", toastOptions)
            return false
        }
        return true
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={wechat} alt="WeChat" />
                        <h1>wechat</h1>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <button type='submit'>Login</button>
                    <span>Don't have an account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: #0C0032;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background: #282828;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background: transparent;
            padding: 1rem;
            border: 0.1rem solid #240090;
            border-radius: 0.4rem;
            color: white;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #5e37d3;
                outline: none;
            }
        }
        button{
            background: #5e37d3;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 500ms ease-in-out;
            &:hover{
                background: #240090;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #240090;
                font-weight: bold;
                text-decoration: none;
            }
        }
    }
`

export default Login;
