import express from "express";
import Auth from "./api/Auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  Auth.signup(username, password).then((data) => res.send(data));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  Auth.login(username, password).then((data) => {
    if (data.error) {
      res.status(401);
      res.send(data);
    } else {
      res.send(data);
    }
  });
});

app.post("/auth", (req, res) => {
  const { username, publicKey } = req.body;

  Auth.auth(username, publicKey).then((data) => {
    if (data.error) {
      res.status(401);
      res.send(data);
    } else {
      res.send(data);
    }
  });
});

app.get("/status", (req, res) => {
  console.log("Supcio");
  res.send(JSON.stringify({ status: "API is running" }));
});

app.listen(5001, () => {});
