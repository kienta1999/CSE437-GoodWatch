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
      <input type="text" className="form-control" placeholder="Search Movies" ref={query} />
    </form>
  ) :
  (
    <form onSubmit={handleSearch}>
      <input type="text" className="form-control" placeholder="Search Movies" 
            onChange={(e) => {
              setQuery(e.target.value);
            }} />
    </form>
  );

  return (
    <Navbar className="mb-5" bg="light" expand="lg">
      <Container>
        <a href="/"><img src={require("../logo.png").default} alt="logo" width="50" /></a>
        <Navbar.Brand href="/">GoodWatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {currUser && (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <NavDropdown title="My Lists" id="basic-nav-dropdown">
                  <MyList navList={true}/>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        {form}

        {!currUser  && (
          <a href="/login">
            <button className="btn ml-2" id="login_btn">
              Log In
            </button>
          </a>
        )}
        {currUser && (
          <button onClick={handleLogout} className="btn ml-2" id="logout_btn">
            Log Out
          </button>
        )}
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
