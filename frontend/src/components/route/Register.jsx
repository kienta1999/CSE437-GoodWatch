import { useState } from "react";

function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="main">
            <div id="tab_btn">
                <a href="/login" className="login_tab">Login</a>
                <a href="/register" className="register_tab active" id="register_tab_id">Register</a>
            </div>
            <br />
            <div id="register_box">
                <h1 id="register_header">Register</h1>
                <form action="/signup" method="POST">
                    <p>First Name</p>
                    <input type="text"
                        onChange={(e) => {setFirstName(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <p>Last Name</p>
                    <input type="text"
                        onChange={(e) => {setlastName(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <p>Username</p>
                    <input type="text"
                        onChange={(e) => {setUsername(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <p>Password</p>
                    <input type="text"
                        onChange={(e) => {setPassword(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <p>Email <i>(optional)</i></p>
                    <input type="text"
                        onChange={(e) => {setEmail(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    />
                    <button className="main_button" id="signup_btn">Sign Up</button>
                    <br />
                </form>
            </div>
        </div>
        
    );
}
export default Register;
