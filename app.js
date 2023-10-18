const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/dbConnection");
const port = process.env.PORT || 5000;
const todoRouter = require("./src/routers/todoRouters");

app.use(express.json());

app.use("/api", todoRouter);

app.get("/", (req, res) => {
  console.log("anasayfa ok !");
  res.send("hoşgeldiniz");
});

app.listen(port, () => {
  console.log(`server ${port} portundan izleniyor...`);
});
