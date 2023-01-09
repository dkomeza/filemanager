import express from "express";
import Auth from "./api/Auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
  Auth.signup("admin", "admin").then((data) => res.send(data));
});

app.post("/login", (req, res) => {
  Auth.login("admin", "admin").then((data) => res.send(data));
});

app.get("/status", (req, res) => {
  console.log("Supcio");
  res.send(JSON.stringify({ status: "API is running" }));
});

app.listen(5001, () => {});
