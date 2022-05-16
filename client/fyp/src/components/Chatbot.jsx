import React, {useState} from "react";
import { Form, Image, Button } from "react-bootstrap";
import {BsFillChatDotsFill} from 'react-icons/bs';
import '../styles/chatbot.css';
import axios from 'axios';
const Chatbot = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [myMessages, setMyMessages] = useState([]);
    
    const sendMessage = (e) => {
        e.preventDefault();
        fetch ("http://localhost:7000/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        })
        .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            messages.push(message);
            // setMyMessages([...myMessages, message]);
            setMessages([...messages, myJson?.reply]);
            setMessage("");

          });

    }


    return (
        <div>
            <div className="container">
    <div className="chatbox" id='chat'>
        {show &&<div className="chatbox__support chatbox--active">
            <div className="chatbox__header">
                <div className="chatbox__image--header">
                    <Image src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                </div>
                <div className="chatbox__content--header">
                    <h4 className="chatbox__heading--header">Chat support</h4>
                    <p className="chatbox__description--header">Hi. My name is Liza. How can I help you?</p>
                </div>
            </div>
            <div className="chatbox__messages">
            {messages?.map((message, index) => <div  key={message}>
                {index % 2 !== 0 ? (
            <div className="chatbox__header my-1 d-flex justify-content-start" style={{backgroundColor:'#e5e5e5', padding:'0px 7px'}}>
                <div className="chatbox__image--header">
                    <Image src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                </div>
                <div className="chatbox__content--header mt-4">
                    <p className="chatbox__description--header">{message}</p>
                </div>
            </div>
            ) : (
                <div className="chatbox__header my-1 d-flex justify-content-end"  style={{backgroundColor:'#f7a088', padding:'0px 7px'}}>
                <div className="chatbox__content--header mt-4 px-2">
                    <p className="chatbox__description--header">{message}</p>
                </div>
                <div className="chatbox__image--header">
                    <Image src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                </div>
            </div>
            )
        }  
            </div> )}
            {/* {messages?.map((message, index) => <div  key={message}>
                {index % 2 === 0 && (
                   
             )}   
                </div> )} */}
            </div>
            <div className="chatbox__footer">
                <Form.Control value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="How can I help you?" />
                <Button onClick={sendMessage}  className="chatbox__send--footer send__button" style={{backgroundColor:'#ef5023', border:'1px solid #ef5023', borderRadius:'20px', marginLeft:'10px', fontSize:'13px'}}>Send</Button>
            </div>
        </div>}
        <div className="chatbox__button">
            <Button><BsFillChatDotsFill onClick={() => setShow(!show)} className="fs-2 " /></Button>
        </div>
    </div>
</div>
        </div>
    );
};

export default Chatbot;