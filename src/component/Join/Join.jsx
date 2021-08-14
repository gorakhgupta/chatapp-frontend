import React, { useState } from 'react'
import './Join.css';
import {Link} from 'react-router-dom';

let user;
const Join = () => {

    const [name, setName] = useState("");

    const senduser = ()=>{
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value= '';
    }
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>LET'S CHAT</h1>
                <input onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
               <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"> <button onClick={senduser} className="joinBtn">Login</button></Link>
            </div>
        </div>
    )   
}

export default Join;
export {user};
