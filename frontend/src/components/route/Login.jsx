import { useState } from "react";
import login from "../../data/login";
import background from '../../background.jpeg';
import jwtDecode from 'jwt-decode'

function Login (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMsg, setLoginMsg] = useState("");

    const handleLoginUser = async () => {
        try {
            const res = await login(username, password);
            setLoginMsg(res.data.message);

            // store token in localStorage
            // localStorage.setItem('token', res.data.authtoken)
            var user = {}
            if (res.data.authtoken) {
              user = jwtDecode(res.data.authtoken)
            }

            if(parseInt(res.status) <= 299){
                props.history.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <img src={background} alt="" className="bg_image"/>
            <div className="main">
                <div id="tab_btn">
                    <a href="/login" className="login_tab active">Login</a>
                    <a href="/register" className="register_tab" id="register_tab_id">Register</a>
                </div>
                <br />
                <div id="login_box">
                    <h1 id="login_header">Login</h1>
                    <p>Username</p>
                    <input type="text"
                        onChange={(e) => {setUsername(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <p>Password</p>
                    <input type="password"
                        onChange={(e) => {setPassword(e.target.value);}}
                        name="first_name"
                        placeholder="First Name"
                    required />

                    <button onClick={handleLoginUser} className="main_button" id="login_btn">Login</button>
                    <br /> <br />
                    <a href="/forget">Forgot password?</a>
                    <p>New user? Sign Up <a href="/register" id="here_btn">Here</a></p>
                    <br />
                    <p className="message">{loginMsg}</p>
                </div>
            </div>            
        </div>
    );
}
export default Login;
