const express = require("express");
const twitter = require("./src/twitter");
const db = require("./queries");

const app = express();

const port = 5000;

app.use(express.json());

app.get("http://134.209.79.135:5000/api/events", db.getEvents);

app.post("http://134.209.79.135:5000/api/events", db.createEvent);

app.post("http://134.209.79.135:5000/api/hashtag", twitter.getTweets);

app.listen(port, () => console.log(`Server started on port: ${port}`));
