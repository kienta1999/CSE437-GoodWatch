import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logout from "../data/logout";
import jwtDecode from 'jwt-decode'
import { useRef, useState, useEffect } from "react";

const NavigationBar = ({ history, userInfo, handleSubmit, query }) => {
  // const profileUrl = `/profile/${movie.imdbID}`;
  const [currUser, setUser] = useState(userInfo);

  useEffect(() => {
    var token = localStorage.getItem('token')
    var user = {}
    if (token) {
      user = jwtDecode(token)
    }
    var newState = {
      authToken: token,
      user: user
    }
    setUser(newState);
    console.log("Nav getting token", token)
    console.log("Nav getting user", user)
    console.log("new State", currUser)
  }, []);

  const handleLogout = async () => {
    try {
        const res = await logout(history);
        if(parseInt(res.status) <= 299){
          history.push("/login");
        }
    } catch (error) {
        console.log(error.data.message);
    }
  }

  const form = handleSubmit && (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" ref={query} />
    </form>
  );
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">GoodWatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              {currUser.user._id && (
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              )}
              {/* <NavDropdown.Item href="#action/3.3">Movie List</NavDropdown.Item> */}
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">
                Something else
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {currUser.user._id &&(
              <button onClick={handleLogout} className="nav_button" id="logout_btn">Log Out</button>
        )} 
        {!currUser.user._id && (
              <a href="/login" className="nav_button" id="logout_btn">Log In</a>
        )} 
        {form}
        
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
