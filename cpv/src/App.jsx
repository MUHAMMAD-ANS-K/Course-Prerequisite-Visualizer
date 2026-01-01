import { useState } from 'react'
import './App.css'
import About from './About'
import NavBar from './NavBar'
import {Link, Routes, Route, useLocation} from 'react-router-dom'
import Home from './Home'
import Footer from './Footer'
import SignIn from './SignIn'
import { DashboardAuthProvider } from "./useDashAuth.jsx";
import BulkAddPrerequisitesPage from './BulkAddPrerequisitesPage'
import DeleteCoursePage from './DeleteCourse'
import ListCoursesPage from './ListCoursePage'
import SearchCoursePage from './SearchCoursePage'
import UpdateCoursePage from './UpdateCourse'
import AddCoursePage from './AddCourse'
import CourseGraph from './Source'
import OTPForm from './Otp'
import { gsap } from 'gsap/gsap-core'
function App() {
    const [email, setEmail] = useState("");
    const loc = useLocation();
    const hidePaths = ["/chat/global", "/chat/voice", "/chat"];
    const hidePathBoolean = hidePaths.includes(loc.pathname);
    function hoverEnter(e) {
      console.log(e.currentTarget.children[0]);
        gsap.to(e.currentTarget.children[0], {
            width : "100%",
            duration : 0.5,
            overwrite : "auto"
        })
    }
    function hoverLeave(e) {
        gsap.to(e.currentTarget.children[0], {
            width : "0%",
            duration : 0.3,
            overwrite : "auto"
        })
    }
  return (
    <div className='navbar-helper'>
      <div className="buttons-main">
        <button onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}><span className="line-blue-main"></span><Link to="/">Student</Link></button>
        <button onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}><span className="line-blue-main"></span><Link to="signin">Admin</Link></button>
      </div>
  {!hidePathBoolean && <NavBar/>}
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signin" element={<SignIn setEmail = {setEmail}/>}/>
      <Route path="/otp" element={<OTPForm email={email}/>}/>
      {/* <Route path="/add" element={<DashboardAuthProvider><AddCoursePage/></DashboardAuthProvider>}/>
      <Route path="/bulkadd" element={<DashboardAuthProvider><BulkAddPrerequisitesPage/></DashboardAuthProvider>}/>
      <Route path="/delCourse" element={<DashboardAuthProvider><DeleteCoursePage/></DashboardAuthProvider>}/>
      <Route path="/listCourse" element={<DashboardAuthProvider><ListCoursesPage/></DashboardAuthProvider>}/>
      <Route path="/updateCourse" element={<DashboardAuthProvider><UpdateCoursePage/></DashboardAuthProvider>}/>
      <Route path="/add" element={<DashboardAuthProvider><AddCoursePage/></DashboardAuthProvider>}/> */}
      <Route path="/bulkadd" element={<BulkAddPrerequisitesPage/>}/>
      <Route path="/delCourse" element={<DeleteCoursePage/>}/>
      <Route path="/listCourse" element={<ListCoursesPage/>}/>
      <Route path="/search" element={<SearchCoursePage/>}/>
      <Route path="/updateCourse" element={<UpdateCoursePage/>}/>
      <Route path="/graph" element={<CourseGraph/>}/>
    </Routes>
    {!hidePathBoolean && <Footer/>}
    </div>
  )
}

export default App
