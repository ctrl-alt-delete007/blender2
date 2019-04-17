const express = require("express");

const app = express();

const port = 5000;

app.get("/api/events", (error, response) => {
  const events = [
    { name: "NFL", hashtag: "superbowl" },
    { name: "MLB", hashtag: "worldseries" },
    { name: "IBF", hashtag: "boxing" }
  ];

  response.json(events);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
