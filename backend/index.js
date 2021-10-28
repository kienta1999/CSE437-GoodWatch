const express = require("express");
const cors = require('cors');
const moment = require('moment');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const jwt = require("jsonwebtoken");
const secret = 'fshkhfksjkjsfkjd';

const app = express();
const port = 3001;
const saltRounds = 10;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(session({
//     key: 'userId',
//     name: 'userId',
//     secret: 'goodwatch',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
// }))

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
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function withToken(req, res, next) {
    //const authHeader = req.headers['authorization']
    // const token = req.body.token;
    const token = req.cookies.access_token;
    console.log(req.cookies)
    console.log("token", token)
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        else {
            req.user = user
            return next() 
        }    
    })
}

//---------------------------- GetUser ----------------------------
app.get('/get-user', withToken, (req,res)=> {
    console.log("get user", req)
    return res.json({user: req.user})
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
                db.query('SELECT * FROM user WHERE username = ?', [username], function(error, user) {
                    if(error){ 
                        res.json(error);
                    }
                    if (user.length > 0) {
                        //create token
                        const jwtoken = jwt.sign({
                            _id: user[0].id,
                            username: user[0].username,
                            firstName: user[0].first_name,
                            lastName: user[0].last_name
                            //add expiration time 
                            }, 
                            secret, {expiresIn: '1d'}
                        );
                        //assign token
                        res.header('Content-Type', 'application/json;charset=UTF-8')
                        res.header('Access-Control-Allow-Credentials', true)
                        res.header("authtoken", jwtoken)
                        .cookie("access_token", jwtoken, {
                            httpOnly: true,
                            // secure: process.env.NODE_ENV === "production",
                            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
                            sameSite: 'none'
                        }).status(200).json({
                            type: "Success",
                            message: "User registered",
                            authtoken: jwtoken,
                            user: {
                                id: user[0].id,
                                username: user[0].username
                            }
                        });
                    } 
                });
            });
        }
    });
});

//---------------------------- Login ----------------------------
app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        db.query('SELECT * FROM user WHERE username = ?', [username], function(error, user) {
            if(error){ 
                res.json(error);
            }
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result){
                        db.query("UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE username = ?", [username]);

                        console.log(user)
                        //create token
                         const jwtoken = jwt.sign({
                            _id: user[0].id,
                            username: user[0].username,
                            firstName: user[0].first_name,
                            lastName: user[0].last_name
                            //add expiration time 
                            }, 
                            secret, {expiresIn: '1d'}
                        );
                        //assign token
                        res.header('Content-Type', 'application/json;charset=UTF-8')
                        res.header('Access-Control-Allow-Credentials', true)
                        res.header("authtoken", jwtoken)
                        .cookie("access_token", jwtoken, {
                            httpOnly: true,
                            // secure: process.env.NODE_ENV === "production",
                            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
                            sameSite: 'none'
                        }).status(200).json({
                            type: "Success",
                            message: "User logged in",
                            authtoken: jwtoken,
                            user: {
                                id: user[0].id,
                                username: user[0].username
                            }
                        });
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

//---------------------------- Logout ----------------------------
app.post('/logout', withToken, (req,res)=> {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out"})
});

