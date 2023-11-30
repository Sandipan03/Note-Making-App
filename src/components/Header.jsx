import React,{useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,useLocation} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout=()=>{
    props.showNotification("Logged out successfully","success");
    localStorage.removeItem('token');
    navigate("/");
  }
    let location = useLocation();

    useEffect(() => {
      // Google Analytics
      console.log(location.pathname);
    }, [location]);
  
  return (
    <div><Navbar expand="lg" className=" navbar-dark bg-dark">
    <Container>
      <Navbar.Brand href="/">iNotebook</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Home</Link>
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
    {!localStorage.getItem('token')? <div className='d-flex'>
          <Link variant="primary" className={` btn btn-primary mx-2 ${location.pathname==="/login"? "d-none": ""}`} to="/login">Login</Link>
          <Link variant="primary" className={`btn btn-primary mx-2 ${location.pathname==="/signup"? "d-none": ""}`} to="/signup">SignUp</Link>
          </div>: <Link variant="primary" onClick={handleLogout} className='btn btn-primary mx-2' to="/signup">Logout</Link>}
  </Navbar></div>
  )
}

export default Header