function Register () {
    return (
        <div className="main">
            <div id="tab_btn">
                <a href="/login" class="login_tab">Login</a>
                <a href="/register" class="register_tab active" id="register_tab_id">Register</a>
            </div>
            <br />
            <div id="register_box">
                <h1 id="register_header">Register</h1>
                <form action="/signup" method="POST">
                    <p>Full Name</p>
                    <input type="text" name="fullname" placeholder="Full Name" required />
                    <p>Email</p>
                    <input type="email" name="email" placeholder="Email" required />
                    <p>Username</p>
                    <input type="text" name="username" placeholder="Username" required />
                    <p>Password</p>
                    <input type="password" name="password" placeholder="Password" required />
                    <button class="main_button" id="signup_btn">Sign Up</button>
                    <br />
                </form>
            </div>
        </div>
        
    );
}
export default Register;
