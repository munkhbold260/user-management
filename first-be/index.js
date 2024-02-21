// module bichiglel
// import bla from "bla bla";
// import data from "./data";

//commonJs bichiglel
const express = require("express");
const app = express();
const cors = require("cors");

const fs = require("fs");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(cors());

const { products, users } = require("./dummy.json");

app.get("/abc", (request, response) => {
  response.type = "application.json";
  response.send({ message: "hello back-end" });
});

app.get("/products", (request, response) => {
  response.type = "application.json";
  response.send({ products: products });
});
// console.log(products);

app.get("/pronames", (request, response) => {
  response.type = "application.json";
  const names = products.map((a) => {
    return a.name;
  });
  response.send({ product: names });
});
////////////////
//this is end point
app.get("/users", (request, response) => {
  response.type = "application.json";
  response.send({ user: users });
});

// app.post("/add-user", (req, res) => {
//   const newUser = req.body;
//   res.send("huselt irseen");
//   console.log(newUser);

//   fs.writeFile("test.json", JSON.stringify(newUser), function (err) {
//     if (err) throw err;
//     console.log("Updated!");
//   });
// });
////////////////////////////////////////////////////////////////////////////////////

app.post("/add-user", (req, res) => {
  const newUser = req.body;
  // console.log("req.body", req.body);
  fs.readFile("dummy.json", (error, data) => {
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(newUser);
      fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
          console.log(err);
          res.send("error happened");
        } else {
          console.log("success");
          res.send("User added successfully");
          console.log("145154", res.send);
          // console.log("22323", data);
        }
      });
    }
  });
});

app.listen(3001, () => {
  console.log("Server is listening");
});
