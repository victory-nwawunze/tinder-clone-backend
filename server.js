/** @format */

import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCard.js";
import Cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection__url =
  "mongodb+srv://admin:Yf8CFjx9sq4zCeui@cluster0.tsxwf.mongodb.net/tinderdb?retryWrites=true&w=majority";
// MiddleWare
app.use(express.json());
app.use(Cors());
// db Config
mongoose.connect(connection__url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// Api EndPoint
app.get("/", (req, res) => res.status(200).send("HELLO CLEVER PROGRAMMER"));
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// Listener
app.listen(port, () => console.log(`Listening to Localhost:  ${port}`));
