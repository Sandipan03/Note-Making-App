import { useState } from 'react'
import Home from './components/Home'
import About from './components/About';
import Header from './components/Header';
import Notification  from './components/Notification';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
function App() {
  // const [count, setCount] = useState(0)
  const [notification, setNotification] = useState(null);
  const showNotification= (message,type) => {
    setNotification({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setNotification(null);
    },2500);
  }
  return (  
    <>
    <NoteState>
      <Router>
    <Header showNotification={showNotification}/>
    <Notification notification={notification}/>
        <Routes>
      <Route path="/" element={<Home showNotification={showNotification}/>}></Route>
      <Route path="/about" element={<About showNotification={showNotification}/>}></Route>
      <Route path="/login" element={<Login showNotification={showNotification}/>} ></Route>
      <Route path="/signup" element={<Signup showNotification={showNotification}/>}></Route>
    </Routes>
      
    </Router>
    </NoteState>
    </>
  )
}

export default App
