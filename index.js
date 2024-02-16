const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  const random = Math.floor(Math.random() * 10) + 1;
  res.render("home", { randomNum: random, title: "home" });
});

// Subreddit Demo
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data, title: subreddit });
  } else {
    res.render("notfound", { title: subreddit, subreddit });
  }
});

// Using array as database
app.get("/about", (req, res) => {
  const allFriends = ["Ram", "Shaym", "Suresh"];
  res.render("about", { friends: allFriends, title: "About" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
