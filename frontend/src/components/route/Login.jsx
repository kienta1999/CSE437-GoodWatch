function Login () {
    return (
        <div className="main">
            <div id="tab_btn">
                <a href="/login" class="login_tab active">Login</a>
                <a href="/register" class="register_tab" id="register_tab_id">Register</a>
            </div>
            <br />
            <div id="login_box">
                <h1 id="login_header">Login</h1>
                <form action="/login" method="POST">
                    <p>Username</p>
                    <input type="text" name="username" placeholder="Username" required />
                    <p>Password</p>
                    <input type="password" name="password" placeholder="Password" required />
                    <button class="main_button" id="login_btn">Login</button>
                    <br /><br /><br />
                </form>
            </div>
        </div>
    );
}
export default Login;
