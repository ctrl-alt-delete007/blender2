require("dotenv").config();

const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

const pool = new Pool({
  user: "postgres",
  host: "134.209.79.135",
  database: "blenderdb",
  password: "",
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
    "INSERT INTO events (name, hashtag) VALUES ($1, $2) RETURNING id",
    [name, hashtag],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send({ id: result.rows[0].id, name, hashtag });
    }
  );
};

module.exports = {
  getEvents,
  createEvent
};
