const express = require("express");
const twitter = require("./src/twitter");
const db = require("./queries");

const app = express();

const port = process.env.port || 5000;

app.use(express.json());

app.get(`https://blenderapp.herokuapp.com:${prot}/api/events`, db.getEvents);

app.post(`https://blenderapp.herokuapp.com:${port}/api/events`, db.createEvent);

app.post(
  `https://blenderapp.herokuapp.com:${port}/api/hashtag`,
  twitter.getTweets
);

app.listen(port, () => console.log(`Server started on port: ${port}`));
