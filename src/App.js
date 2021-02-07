import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';

function App() {
  const socket = useRef(null);
  const [retard, setRetard] = useState(0);
  const [GME, setGME] = useState(0);
  const [AMC, setAMC] = useState(0);

  useEffect(() => {
    socket.current = io("http://127.0.0.1:5000");
    socket.current.on('connect', () => {
      console.log('connected');
    });
    socket.current.onAny((e, arg) => {
      console.log(e, arg);
      if (e === 'retard') {
        setRetard(arg.count);
      }
      if (e === 'GME') {
        setGME(arg.count);
      }
      if (e === 'AMC') {
        setAMC(arg.count);
      }
    });
    return () => {
      socket.current.close();
    }
  }, [])
  

  return (
    <div className="App">
    <div className="grid">
        <div>Retard</div>
        <div>AMC</div>
        <div>GME</div>
        <div>{retard}</div>
        <div>{AMC}</div>
        <div>{GME}</div>
    </div>
    </div>
  );
}

export default App;
