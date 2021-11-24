import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import logout from "../data/logout";
import MyList from "./MyList.jsx";
import jwtDecode from "jwt-decode";
import { useRef, useState, useEffect } from "react";
import "./components.css";

const NavigationBar = ({ history, handleSubmit, query }) => {
  const [searchQuery, setQuery] = useState("");
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

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(searchQuery);
    var page = `/searchresult/${searchQuery}`
    history.push(page);
  };

  const form = handleSubmit ? (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search Movies" ref={query} />
    </form>
  ) :
  (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search Movies" 
            onChange={(e) => {
              setQuery(e.target.value);
            }} />
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
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              {currUser && (
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              )}
        
              {currUser && (
                <>
                  <NavDropdown.Divider />
                  <MyList navList={true}/>
                </>
              )}

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {!currUser  && (
          <a href="/login">
            <button className="nav_button" id="login_btn">
              Log In
            </button>
          </a>
        )}
        {currUser && (
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
