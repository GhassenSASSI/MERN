import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import loader from '../assets/yy3.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { avatarRoute } from '../utils/api'
import { Buffer } from 'buffer';

const Avatar = () => {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectAvatar, setSelectAvatar] = useState(undefined)

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')) {
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setProfilePicture = async () => {
        if(selectAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions)
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
                image: avatars[selectAvatar]
            })

            if(data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                navigate("/")
            } else {
                toast.error("Please try again", toastOptions)
            }
        }
    }
    
    const fetchAvatars = async () => {
        const data = []
        for(let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            )
            const buffer = Buffer.from(image.data)
            data.push(buffer.toString("base64"))
        }
        setAvatars(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAvatars()
    }, [])

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className='loader' />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">{
                        avatars.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectAvatar(index)} />
                                </div>
                            )
                        })
                    }</div>
                    <button className="submit-btn" onClick={setProfilePicture} >Set as profile picture</button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background: #0C0032;
    height: 100vh;
    width: 100vw;
    .loader{
        min-inline-size: 20%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 500ms ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #5e37d3;
        }
    }
    .submit-btn{
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
`

export default Avatar;
