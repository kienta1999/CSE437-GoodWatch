const express = require("express");
const cors = require('cors');
const moment = require('moment');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();
const port = 3001;
const saltRounds = 10;
app.use(cors());
app.use(cookieParser());

app.use(session({
    key: 'userId',
    secret: 'goodwatch',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const db = mysql.createConnection({
    host: "goodwatch-database.cmajrbcw78hz.us-east-2.rds.amazonaws.com",
    user: "anhvqle",
    password: "helloVN84",
    database: "good_watch",
})

db.connect( (error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Database Connected successfully");
    }
})

app.get("/", (req, res) => {
    res.json({ app: "goodWatch" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//--------------------------- Register ---------------------------
app.post("/register", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    db.query('SELECT * FROM user WHERE username = ?', [username], function(error, results) {
        if(error) throw error;
        if (results.length > 0) {
            res.status(404).json({ message: "Duplicate User"});
        } 
        else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                db.query("INSERT INTO user (`first_name`, `last_name`, `username`, `password`, `email`, `last_login`) VALUES (?,?,?,?,?,?)",[firstName, lastName, username, hash, email, moment.utc().format("YYYY-MM-DD HH:mm:ss")]);
                res.status(200).json({ message: "User Registered", user : {
                    firstName : firstName,
                    lastName : lastName,
                    username : username,
                    password : password,
                    email : email,
                }})
            });
        }
    });
});

//---------------------------- Login ----------------------------
app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    if (username && password) {
        db.query('SELECT * FROM user WHERE username = ?', [username], function(error, user) {
            if(error){ 
                res.json(error);
            }
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result){
                        db.query("UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE username = ?", [username]);

                        req.session.user = user;
                        console.log("User", req.session.user);

                        res.status(200).json({ message: "User logged in", user : user[0]})
                    }
                    else{
                        res.status(404).json({ message: "Incorrect Password"});
                    }
                });
            } 
            else {
                res.status(404).json({ message: "Incorrect Username"});
            }           
        });
    } 
    else {
        res.status(404).json({ message: "Invalid"});
    }
});