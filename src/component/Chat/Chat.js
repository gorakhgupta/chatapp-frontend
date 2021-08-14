import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join';
import './Chat.css';
import socketIo from 'socket.io-client';
import Message from '../message/Message';
import ReacyScrollToBot from 'react-scroll-to-bottom';
const ENDPOINT = 'https://mysuper-chat-app.herokuapp.com/';

   const socket = socketIo(ENDPOINT,{transports:['websocket']});
const Chat = () => {
    const [id, setid] = useState("");
    const [userid, setuserid] = useState("");
    const [messages, setmessages] = useState([]);
   const send = ()=>{
 
       
       const message = document.getElementById('chatInput').value;
       socket.emit('message',{message,id});

       document.getElementById('chatInput').value = '';
   }
    useEffect(() => {

        const socket = socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
            // alert("connected");
            console.log('Id before setid',id);
            setid(socket.id);
            
            console.log('Id after setid',id);
        })
        // console.log(socket);

    
        socket.emit('joined',{user});
        socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('userJoined',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
        })
        return () => {
           
            socket.emit('disconnect');
                socket.off();
            
        }
    }, []);
    useEffect(() => {
        
        const socket = socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('sendMessage',(data)=>{
            setuserid(id);
            setmessages([...messages,data]);
            console.log("Sendmsg",data.user,data.message,data.id);
           
            // setid(data.id);

        })
        return () => {
            socket.off();
            
        }
    }, [messages]);
    return (
        <div className="chatPage">
            <div className="chatContainer">
            <div className="chatHeader">
                <h2 className="head">LET'S CHAT</h2>
                <a href="/"  ><button className="backbutton"> BACK </button></a>
            </div>
            <ReacyScrollToBot className="chatBox">
              { messages.map((item,id)=> <Message user={item.id===userid?'':item.user} message={item.message} classs={item.id===userid ? 'right':'left'}/>)}
             
                
            </ReacyScrollToBot>
            <div className="inputBox">
                <input type="text" id="chatInput" />
                <button onClick={send} className="sendBtn">Send</button>
            </div>

            </div>
        </div>
    )
}

export default Chat
