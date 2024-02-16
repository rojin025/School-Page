const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  const random = Math.floor(Math.random() * 10) + 1;
  res.render("home", { randomNum: random });
});

// Subreddit Demo
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

// Using array as database
app.get("/aboutus", (req, res) => {
  const allFriends = ["Ram", "Shaym", "Suresh"];
  res.render("aboutus", { friends: allFriends });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
