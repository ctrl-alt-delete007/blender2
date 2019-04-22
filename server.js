const express = require("express");
const twitter = require("./src/twitter");
const db = require("./queries");

const app = express();

const port = 5000;

app.use(express.json());

app.get("https://blenderapp.herokuapp.com:5000/api/events", db.getEvents);

app.post("https://blenderapp.herokuapp.com:5000/api/events", db.createEvent);

// need to revise the below route to GET
app.post("/api/hashtag", twitter.getTweets);

app.listen(port, () => console.log(`Server started on port: ${port}`));
