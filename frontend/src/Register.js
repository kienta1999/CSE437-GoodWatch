function Register () {
    return (
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
                <button class="firebase_btn" id="signup_btn">Sign Up</button>
                <br />
            </form>
      </div>
    );
}
export default Register;
