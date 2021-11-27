import { useState, useContext } from "react";
import register from "../../data/register";
import background from "../../background.jpeg";
import jwtDecode from "jwt-decode";
import UserContext from "../../context/UserContext";

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [registerMsg, setRegisterMsg] = useState("");
  const { setUser } = useContext(UserContext);

  const handleRegisterUser = async () => {
    try {
      const res = await register(
        firstName,
        lastName,
        username,
        password,
        email,
        props.history
      );
      setRegisterMsg(res.data.message);

      // store token in localStorage
      localStorage.setItem('authtoken', res.data.authtoken)
      var user = {};
      if (res.data.authtoken) {
        user = jwtDecode(res.data.authtoken);
      }

      //callback to App.js
      setUser(user);

      if (parseInt(res.status) <= 299) {
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img src={background} alt="" className="bg_image" />
      <div className="main_logreg">
        <div id="tab_btn">
          <a href="/login" className="login_tab">
            Login
          </a>
          <a
            href="/register"
            className="register_tab active"
            id="register_tab_id"
          >
            Register
          </a>
        </div>
        <br />
        <div id="register_box">
          <h1 id="register_header">Register</h1>
          <p>First Name</p>
          <input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name="first_name"
            placeholder="First Name"
            required
          />

          <p>Last Name</p>
          <input
            type="text"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            name="first_name"
            placeholder="First Name"
            required
          />

          <p>Username</p>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="first_name"
            placeholder="First Name"
            required
          />

          <p>Password</p>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="first_name"
            placeholder="First Name"
            required
          />

          <p>
            Email <i>(optional)</i>
          </p>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="first_name"
            placeholder="First Name"
          />
          <button
            onClick={handleRegisterUser}
            className="main_button"
            id="signup_btn"
          >
            Sign Up
          </button>
          <br />
          <br />
          <p className="message">{registerMsg}</p>
        </div>
      </div>
    </div>
  );
}
export default Register;
