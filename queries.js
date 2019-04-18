const Pool = require("pg").Pool;

const pool = new Pool({
  user: "carlofernando",
  host: "localhost",
  database: "blenderdb",
  port: 5432
});

const getEvents = (request, response) => {
  pool.query("SELECT * FROM events ORDER BY id DESC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createEvent = (request, response) => {
  const { name, hashtag } = request.body;

  pool.query(
    "INSERT INTO events (name, hashtag) VALUES ($1, $2)",
    [name, hashtag],
    (error, result) => {
      if (error) {
        throw error;
      }

      response.status(201).send({ name, hashtag });
    }
  );
};

module.exports = {
  getEvents,
  createEvent
};
