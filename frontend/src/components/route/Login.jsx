function Login () {
    return (
        <div className="main">
            <div id="tab_btn">
                <a href="/login" className="login_tab active">Login</a>
                <a href="/register" className="register_tab" id="register_tab_id">Register</a>
            </div>
            <br />
            <div id="login_box">
                <h1 id="login_header">Login</h1>
                <form action="/login" method="POST">
                    <p>Username</p>
                    <input type="text" name="username" placeholder="Username" required />
                    <p>Password</p>
                    <input type="password" name="password" placeholder="Password" required />
                    <button className="main_button" id="login_btn">Login</button>
                    <br /> <br />
                    <a href="/forget">Forgot password?</a>
                    <p>New user? Sign Up <a href="/register" id="here_btn">Here</a></p>
                </form>
            </div>
        </div>
    );
}
export default Login;
