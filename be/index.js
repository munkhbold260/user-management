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

async function getPgVersion() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "CREATE TABLE users (name VARCHAR(255), age INT, phone VARCHAR(255), email VARCHAR(255), id VARCHAR(255))"
    );

    // console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("DROP TABLE users ");

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
  const Query = `INSERT INTO users (name, age, email, id ) VALUES ('${newUser.name}','${newUser.age}','${newUser.email}','${newUser.id}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }

  res.status(200).send({ message: "User Added successfully" });
});

app.delete("/delete-user", async (req, res) => {
  const deleteUser = req.body;
  console.log("requ", deleteUser.name);
  const client = await pool.connect();
  const Query = `DELETE FROM users WHERE name='${deleteUser.name}'`;
  // const Query = "DELETE FROM users WHERE name='bold'";

  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user deleted");
  }
  res.status(200).send({ message: "User Delete is successfully" });
});
// DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
//////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/get-user", async (req, res) => {
  const allUser = req.body;
  console.log("requ", allUser.name);
  const client = await pool.connect();
  const Query = "SELECT * FROM users;";
  // const Query = "DELETE FROM users WHERE name='bold'";

  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user deleted");
  }
  res.status(200).send({ message: "User Delete is successfully" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
