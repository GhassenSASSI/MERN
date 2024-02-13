import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (emoji) => {
        const input = document.getElementsByClassName("messagesInput")
        let message = input[0].getAttribute("value")
        input.onChange = (e) => message = e.target.value
        message += emoji.emoji
        setMsg(message)
    }

    const sendChat = (event) => {
        event.preventDefault()
        if(msg.length > 0) {
            handleSendMsg(msg)
            setMsg("")
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input className="messagesInput" type="text" placeholder='Type a message' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background: #190061;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width:720px) and (max-width:1080px) {
        padding: 0.3rem;
        gap: 0.5rem;
    }
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact{
                position: absolute;
                top: -470px;
                background: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9186f3;
                .epr-body::-webkit-scrollbar{
                    background: #080420;
                    width: 10px;
                    &-thumb{
                        background: #9186f3;
                        border-radius: 20%;
                    }
                }
                .epr-category-nav{
                    button{
                        filter: contrast(0);
                    }
                }
                input{
                    background: transparent;
                    border-color: #9186f3;
                }
                .epr-emoji-category-label{
                    background: #0d0d30;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        background: #ffffff34;
        gap: 2rem;
        input{
            width: 90%;
            background: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background: #91f6f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.3rem;
            border-radius: 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #5e37d3;
            border: none;
            cursor: pointer;
            @media screen and (min-width:720px) and (max-width:1080px) {
                padding: 0.3rem 0.5rem;
                svg{
                    font-size: 1rem;
                }
            }
            svg{
                font-size: 2rem;
                color: white;
            }
        }
    }
`

export default ChatInput;
