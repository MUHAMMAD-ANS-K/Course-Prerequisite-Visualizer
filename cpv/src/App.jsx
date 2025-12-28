import { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './Home'
import Footer from './Footer'
function App() {

    const loc = useLocation();
    const hidePaths = ["/chat/global", "/chat/voice", "/chat"];
    const hidePathBoolean = hidePaths.includes(loc.pathname);
  return (
    <div className='navbar-helper'>
  {!hidePathBoolean && <NavBar/>}
    <Routes>
      <Route path="/" element = {<Home/>}/>
    </Routes>
    {!hidePathBoolean && <Footer/>}
    </div>
  )
}

export default App
