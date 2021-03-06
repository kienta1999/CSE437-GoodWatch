const express = require("express");
const cors = require("cors");
const moment = require("moment");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const jwt = require("jsonwebtoken");
const secret = "fshkhfksjkjsfkjd";

const app = express();
const port = 3001;
const saltRounds = 10;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: "goodwatch-database.cmajrbcw78hz.us-east-2.rds.amazonaws.com",
  user: "anhvqle",
  password: "helloVN84",
  database: "good_watch",
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Database Connected successfully");
  }
});

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// function filterListIds(listIds, userId) {
//   db.query(
//     "SELECT * FROM lists WHERE userId = ?",
//     [userId],
//     function (error, results) {
//       if (error) {
//         res.json(error);
//       } else {
//         if (results && results.length > 0) {
//           //there are lists
//           let possibleListIds = [];
//           results.map((list) => {
//               possibleListIds.push(list["id"]);
//           });

//           var listIdstoUse = [];
//           for (let i = 0; i < listIds.length; i++) {
//             if (possibleLists.includes(listIds[i])) {
//               listIdstoUse.push(listIds[i]);
//             }
//           }
//           return listIdstoUse
//         } 
//         else {
//           //no lists so cannot use
//           return ([])
//         }     
//       }
//     }
//   );
// }


//---------------------------- Authentication Middleware ----------------------------

function withToken(req, res, next) {
  //const token = req.cookies.access_token;
  const token = req.headers.authtoken;
  console.log("TOKEN HERE", token)
  if (token == null) {
    console.log("not logged in/not auth");
    return res.sendStatus(401);
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      req.user = user;
      return next();
    }
  });
}

//---------------------------- GetUser ----------------------------
app.post("/get-user", withToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

//---------------------------- CreateList ----------------------------
app.post("/create-list", withToken, (req, res) => {
  console.log("create list", req);
  let listName = req.body.listName;
  let userId = req.user._id;
  if (listName) {
    db.query(
      "INSERT INTO lists (`listName`, `userId`) VALUES (?,?)",
      [listName, userId],
      function (error, data) {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json({ message: "Successfully Added List!" });
        }
      }
    );
  }
});

//---------------------------- DeleteList ----------------------------
app.post("/delete-list", withToken, (req, res) => {
  console.log("delete list", req);
  let listId = req.body.listId;
  let userId = req.user._id;
  if (listId) {
    db.query(
      "DELETE FROM listItems WHERE listId=?",
      [listId],
      function (error, data) {
        if (error) {
          res.json(error);
        } else {
          db.query(
            "DELETE FROM lists WHERE id=?",
            [listId],
            function (error, data) {
              if (error) {
                res.json(error);
              } else {
                res.status(200).json({ message: "Successfully Deleted List!" });
              }
          });
        }
      }
    );
  }
});

//---------------------------- User's movie rating & review ----------------------------
app.post("/user/:uid/movie/:mid/review", withToken, (req, res) => {
  let userId = req.params.uid;
  let movieId = req.params.mid;
  let rating = req.body.rating;
  let comment = req.body.comment;

  if (userId && movieId && rating) {
    db.query(
      "SELECT * FROM movieRating WHERE userId = ? AND movieId = ?",
      [userId, movieId],
      function (error, results) {
        if (error) {
          res.json(error);
        }
        if (results.length > 0) {
          db.query(
            "SELECT comment from movieRating WHERE (userId = ? AND movieId = ?)",
            [userId, movieId],
            function (error, previousComment) {
              if (error) {
                res.json(error);
              } else {
                comment = comment || previousComment[0].comment;
                db.query(
                  "UPDATE movieRating SET rating = ?, comment = ? WHERE (userId = ? AND movieId = ?)",
                  [rating, comment, userId, movieId],
                  function (error, data) {
                    if (error) {
                      res.json(error);
                    } else {
                      res
                        .status(200)
                        .json({ message: "Successfully Update User Review" });
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO movieRating (`userId`, `movieId`, `rating`, `comment`) VALUES (?,?,?,?)",
            [userId, movieId, rating, comment],
            function (error, data) {
              if (error) {
                res.json(error);
              } else {
                res
                  .status(200)
                  .json({ message: "Successfully Insert a New User Review" });
              }
            }
          );
        }
      }
    );
  } else {
    res.status(404).json({ message: "Invalid" });
  }
});

//---------------------------- Display Movie's Comments ----------------------------
app.get("/movie/:id/reviews", withToken, (req, res) => {
  let movieId = req.params.id;
  if (movieId) {
    db.query(
      `SELECT user.id, user.first_name, user.last_name, movieRating.rating, movieRating.comment FROM movieRating
                INNER JOIN user ON movieRating.userId=user.id and movieRating.movieId = ?`,
      [movieId],
      function (error, reviews) {
        if (error) {
          res.status(500).send(error);
        }
        res.status(200).json(reviews);
      }
    );
  }
});

//---------------------------- RemoveFromList ----------------------------
app.post("/remove-from-list", withToken, (req, res) => {
  console.log("remove from list", req);
  let lists = req.body.lists;
  let movieId = req.body.movieId;
  if (lists && movieId && lists.length > 0) {

    values = []
    lists.map(function (li, index) {
      values.push(li.id)
    });
    console.log("VALUES", values)

    db.query(
      "DELETE FROM listItems WHERE (listId IN (?)) AND (imdbId = ?)",
      [values,movieId],
      function (error, data) {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json({ message: "Successfully removed from List!" });
        }
      }
    );
  }
});

//---------------------------- GetLists ----------------------------
app.post("/get-lists", withToken, (req, res) => {
  let userId = req.user._id;
  if (req.body.otherUser) {
    let otherUser = req.body.otherUser;
    db.query(
      "SELECT * FROM lists WHERE userId = ?",
      [otherUser],
      function (error, results) {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json({
            message: "Successfully got lists",
            type: "Success",
            listInfo: results,
          });
        }
      }
    );
  } else {
    db.query(
      "SELECT * FROM lists WHERE userId = ?",
      [userId],
      function (error, results) {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json({
            message: "Successfully got lists",
            type: "Success",
            listInfo: results,
          });
        }
      }
    );
  }
});

//---------------------------- GetListContent ----------------------------
app.post("/get-list-content", withToken, (req, res) => {
  let userId = req.user._id;
  let listId = req.body.listId;
  console.log("GETCONTENT:", listId);
  db.query(
    "SELECT * FROM listItems WHERE listId = ?",
    [listId],
    function (error, results) {
      console.log("GETCONTENT:", results);
      if (error) {
        res.json(error);
      } else {
        res.status(200).json({
          message: "Successfully got list content",
          type: "Success",
          listContent: results,
        });
      }
    }
  );
});

//---------------------------- AddToList ----------------------------
app.post("/add-to-list", withToken, (req, res) => {
  console.log("add to list", req.body.lists);
  let lists = req.body.lists;
  let movieId = req.body.movieId;
  if (lists && movieId) {
    lists.map(function (li, index) {
      db.query(
        "INSERT INTO listItems (`listId`, `imdbId`) VALUES (?,?)",
        [li.value, movieId],
        function (error, data) {
          console.log("INSERT", data)
          if (error) {
            res.json(error);
          } else {
            
          }
        }
      );
    });
    res.status(200).json({ message: "Successfully Updated Lists!" });
  }
});

//---------------------------- ChangeList ----------------------------
app.post("/change-list", withToken, (req, res) => {
  console.log("change list", req);
  let newListId = req.body.listId;
  let movieId = req.body.movieId;
  if (newListId && movieId) {
    db.query(
      "SELECT * FROM listItems WHERE listId = ? AND imdbId = ?",
      [newListId, movieId],
      function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
          res.status(404).json({ message: "Duplicate item" });
        } else {
          db.query(
            "UPDATE listItems SET listId = ? WHERE imdbId = ?",
            [newListId, movieId],
            function (error, data) {
              if (error) {
                res.json(error);
              } else {
                res
                  .status(200)
                  .json({ message: "Successfully updated to new List!" });
              }
            }
          );
        }
      }
    );
  }
});

//---------------------------- Check if In List ----------------------------
app.post("/check-list", withToken, (req, res) => {
  console.log("check list", req);
  let userId = req.user._id;
  let movieId = req.body.movieId;
  let possibleLists = req.body.possibleListIds;
  
  console.log("STUFF FOR CHECKING LIST", possibleLists);
  console.log("STUFF FOR CHECKING LIST", userId, movieId);
  
  if (movieId && userId && possibleLists) {
    db.query(
      "SELECT * FROM listItems WHERE imdbId = ?",
      [movieId],
      function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
          console.log("STUFF FOR CHECKING LIST", results);
          var listIdstoUse = [];
          for (let i = 0; i < results.length; i++) {
            console.log(results[i].listId);
            if (possibleLists.includes(results[i].listId)) {
              listIdstoUse.push(results[i].listId);
            }
          }
          console.log(listIdstoUse);
          if (listIdstoUse.length > 0) {
            db.query(
              "SELECT * FROM lists WHERE id IN (?)",
              [listIdstoUse],
              function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                  res.status(200).json({
                    message: "Already in a list",
                    type: "Success",
                    existingLists: results,
                  });
                } else {
                  res.status(200).json({
                    message: "Not in a list",
                    type: "Success",
                    existingLists: null,
                  });
                }
              }
            );
          }
          else {
            res.status(200).json({
              message: "Not in a list",
              type: "Success",
              existingList: null,
            });
          }
        } else {
          res.status(200).json({
            message: "Not in a list",
            type: "Success",
            existingList: null,
          });
        }
      }
    );
  }
});

//--------------------------- Register ---------------------------
app.post("/register", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  db.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    function (error, results) {
      if (error) throw error;
      if (results.length > 0) {
        res.status(404).json({ message: "Duplicate User" });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          db.query(
            "INSERT INTO user (`first_name`, `last_name`, `username`, `password`, `email`, `last_login`) VALUES (?,?,?,?,?,?)",
            [
              firstName,
              lastName,
              username,
              hash,
              email,
              moment.utc().format("YYYY-MM-DD HH:mm:ss"),
            ]
          );
          db.query(
            "SELECT * FROM user WHERE username = ?",
            [username],
            function (error, user) {
              if (error) {
                res.json(error);
              }
              if (user.length > 0) {
                userId = user[0].id;
                userName = user[0].username;
                first_name = user[0].first_name;
                last_name = user[0].last_name;
                db.query(
                  "INSERT INTO lists (`listName`, `userId`) VALUES (?,?)",
                  ["Want to Watch", userId]
                );
                db.query(
                  "INSERT INTO lists (`listName`, `userId`) VALUES (?,?)",
                  ["Currently Watching", userId]
                );
                db.query(
                  "INSERT INTO lists (`listName`, `userId`) VALUES (?,?)",
                  ["Watched", userId],
                  function (error, data) {
                    if (error) {
                      res.json(error);
                    } else {
                      //create token
                      const jwtoken = jwt.sign(
                        {
                          _id: userId,
                          username: userName,
                          firstName: first_name,
                          lastName: last_name,
                          //add expiration time
                        },
                        secret,
                        { expiresIn: "1d" }
                      );
                      //headers and assign cookie
                      res.header(
                        "Content-Type",
                        "application/json;charset=UTF-8"
                      );
                      res.header("Access-Control-Allow-Credentials", true);
                      res
                        .header("authtoken", jwtoken)
                        .cookie("access_token", jwtoken, {
                          httpOnly: true,
                          sameSite: "none",
                          secure:
                            req.secure ||
                            req.headers["x-forwarded-proto"] === "https",
                          expire: new Date() + 9999,
                        })
                        .status(200)
                        .json({
                          type: "Success",
                          message: "User registered",
                          authtoken: jwtoken,
                          user: {
                            id: userId,
                            username: userName,
                          },
                        });
                    }
                  }
                );
              }
            }
          );
        });
      }
    }
  );
});

//---------------------------- Login ----------------------------
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    db.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      function (error, user) {
        if (error) {
          res.json(error);
        }
        if (user && user.length > 0) {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result) {
              db.query(
                "UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE username = ?",
                [username]
              );

              console.log(user);
              //create token
              const jwtoken = jwt.sign(
                {
                  _id: user[0].id,
                  username: user[0].username,
                  firstName: user[0].first_name,
                  lastName: user[0].last_name,
                  //add expiration time
                },
                secret,
                { expiresIn: "1d" }
              );
              //headers and assign cookie
              res.header("Content-Type", "application/json;charset=UTF-8");
              res.header("Access-Control-Allow-Credentials", true);
              res
                .header("authtoken", jwtoken)
                .cookie("access_token", jwtoken, {
                  httpOnly: true,
                  sameSite: "none",
                  secure:
                    req.secure || req.headers["x-forwarded-proto"] === "https",
                  expire: new Date() + 9999,
                })
                .status(200)
                .json({
                  type: "Success",
                  message: "User logged in",
                  authtoken: jwtoken,
                  user: {
                    id: user[0].id,
                    username: user[0].username,
                  },
                });
            } else {
              res.status(404).json({ message: "Incorrect Password" });
            }
          });
        } else {
          res.status(404).json({ message: "Incorrect Username" });
        }
      }
    );
  } else {
    res.status(404).json({ message: "Invalid" });
  }
});

//---------------------------- Logout ----------------------------
app.post("/logout", withToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

//---------------------------- CheckUser ----------------------------
app.get("/user/:userid", (req, res) => {
  userID = req.params.userid;
  db.query(
    "SELECT * FROM user WHERE id = ?",
    [userID],
    function (error, results) {
      if (error) return res.status(404).json(error);
      if (results.length == 0) {
        console.log("User Not Exist");
        return res.status(404).json({ message: "User Not Exist" });
      } else {
        console.log("User Found");
        return res.status(200).json(results[0]);
      }
    }
  );
});

//---------------------------- Follow ----------------------------
app.post("/follow", (req, res) => {
  curr_userID = req.body.curr_userid;
  userID = req.body.userid;
  console.log(userID, curr_userID);
  db.query(
    "SELECT * FROM friends WHERE followed = ? AND follower = ?",
    [userID, curr_userID],
    (error, results) => {
      if (error) return res.status(404).json(error);
      if (results.length > 0) {
        console.log("Error: Already Followed");
        return res.status(404).json({ message: "Error: Already Followed" });
      } else {
        db.query(
          "INSERT INTO friends (`followed`, `follower`) VALUES (?,?)",
          [userID, curr_userID],
          (error, data) => {
            if (error) return res.status(404).json(error);
            else {
              console.log("Successfully Followed");
              return res.status(200).json({ message: "Successfully Followed!" });
            }
          }
        );
      }
    }
  );
});

//---------------------------- Unfollow ----------------------------
app.post("/unfollow", (req, res) => {
  curr_userID = req.body.curr_userid;
  userID = req.body.userid;
  db.query(
    "SELECT * FROM friends WHERE followed = ? AND follower = ?",
    [userID, curr_userID],
    (error, results) => {
      if (error) return res.status(404).json(error);
      if (results.length == 0) {
        console.log("Error: Not Yet Followed");
        return res.status(404).json({ message: "Error: Not Yet Followed" });
      } else {
        db.query(
          "DELETE FROM friends WHERE followed = ? AND follower = ?",
          [userID, curr_userID],
          (error, data) => {
            if (error) return res.status(404).json(error);
            else {
              console.log("Successfully Unfollow");
              return res.status(200).json({ message: "Successfully Unfollowed!" });
            }
          }
        );
      }
    }
  );
});

//---------------------------- Check-Follow ----------------------------
app.post("/check-follow", withToken, (req, res) => {
  let curr_userId = req.user._id;
  let userID = req.body.userid;
  db.query(
    "SELECT * FROM friends WHERE followed = ? AND follower = ?",
    [userID, curr_userId],
    (error, results) => {
      if (error) return res.status(404).json(error);
      if (results.length > 0) {
        console.log("Already Followed");
        return res.status(200).json({ followed: true });
      } else {
        console.log("Not Yet Followed");
        return res.status(200).json({ followed: false });
      }
    }
  );
});

//---------------------------- Get-Followers ----------------------------
app.post("/get-followers", withToken, (req, res) => {
  let userID = req.body.userid != 0 ? req.body.userid : req.user._id;
  db.query(
    "SELECT id, username FROM user WHERE id IN (SELECT follower FROM friends WHERE followed = ?)",
    [userID],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

//---------------------------- Get-Following ----------------------------
app.post("/get-following", withToken, (req, res) => {
  let userID = req.body.userid != 0 ? req.body.userid : req.user._id;
  db.query(
    "SELECT id, username FROM user WHERE id IN (SELECT followed FROM friends WHERE follower = ?)",
    [userID],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

//---------------------------- Count-Followers ----------------------------
app.post("/count-followers", withToken, (req, res) => {
  let userID = req.body.userid != 0 ? req.body.userid : req.user._id;
  db.query(
    "SELECT COUNT(*) FROM friends WHERE followed = ?",
    [userID],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      } else {
        return res.status(200).json({ count: result[0]["COUNT(*)"] });
      }
    }
  );
});

//---------------------------- Count-Following ----------------------------
app.post("/count-following", withToken, (req, res) => {
  let userID = req.body.userid != 0 ? req.body.userid : req.user._id;
  db.query(
    "SELECT COUNT(*) FROM friends WHERE follower = ?",
    [userID],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      } else {
        return res.status(200).json({ count: result[0]["COUNT(*)"] });
      }
    }
  );
});

//---------------------------- Get movies from followers --------------------
app.get("/following-movies", withToken, (req, res) => {
  let userID = req.user?._id || 25;
  db.query(
    "SELECT followed FROM friends WHERE follower = ?",
    [userID],
    (error, result) => {
      if (error) {
        return res.status(404).json(error);
      } else {
        const follower = result.map((item) => item.followed);
        //   .map((id) => "'" + id + "'")
        //   .join();
        db.query(
          "SELECT movieId, rating FROM movieRating WHERE userId IN (" +
            db.escape(follower) +
            ")",
          (error2, ratings) => {
            if (error2) {
              return res.status(404).json(error2);
            } else {
              return res.status(200).json(ratings);
            }
          }
        );
      }
    }
  );
});

//---------------------------- Get-All-Users ----------------------------
app.post("/all-users", withToken, (req, res)=> {
  let userID = req.user._id;
  db.query("SELECT id, username FROM user WHERE id != ?", [userID], (error, result) => {
      if (error) {
          return res.status(404).json(error);
      }
      else {
        console.log(result);
        return res.status(200).json(result);
      }
  });
  
});
