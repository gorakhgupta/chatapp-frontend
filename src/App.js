// import socketIO from 'socket.io-client';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat.js';

// const ENDPOINT = 'http://localhost:8000/';
// const socket = socketIO(ENDPOINT,{transports:['websocket']});



function App() {
  // socket.on('connect',() =>{
  
  // })
  return (
    <div className="Appa">
     <Router> 
       <Route exact path="/" component={Join} />
       <Route exact path="/chat" component={Chat} />
     </Router>
    </div>
  );
}

export default App;
