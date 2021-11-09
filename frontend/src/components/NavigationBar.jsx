import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import logout from "../data/logout";
import jwtDecode from "jwt-decode";
import { useRef, useState, useEffect } from "react";
import "./components.css";

const NavigationBar = ({ history, handleSubmit, query }) => {
  //IMPORTANT: user info is passed down from App.js in userInfo
  const { currUser, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await logout(history);

      //callback to App.js, set user state to null
      setUser(null);

      if (parseInt(res.status) <= 299) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const form = handleSubmit && (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" ref={query} />
    </form>
  );
  return (
    <Navbar className="mb-4" bg="light" expand="lg">
      <Container>
        <img src={require("../logo.png").default} alt="logo" width="50" />
        <Navbar.Brand href="/">GoodWatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              {currUser && (
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

        {!currUser || JSON.stringify(currUser) === "{}" ? (
          <a href="/login" className="nav_button" id="logout_btn">
            Log In
          </a>
        ) : (
          <button onClick={handleLogout} className="nav_button" id="logout_btn">
            Log Out
          </button>
        )}
        {form}
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
