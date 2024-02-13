import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi'

const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
            <span>Logout</span>
        </Button>
    );
}

const Button = styled.button`
width: 11%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background: #5e37d3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
    span{
        color: white;
        text-transform: uppercase;
    }
    @media screen and (min-width:720px) and (max-width:1080px) {
        span{
            display: none;
        }
    }
`

export default Logout;
