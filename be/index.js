const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// require("dotenv").config();

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConfig);

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query(
//       "CREATE TABLE users (name VARCHAR(255), age INT, phone VARCHAR(255), email VARCHAR(255))"
//     );

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

app.post("/add-user", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, age, email) VALUES ('${newUser.name}','${newUser.age}','${newUser.email}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  res.status(200).send({ message: "User Added successfully" });
});

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
