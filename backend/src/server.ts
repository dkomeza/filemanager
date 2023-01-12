import express from "express";
import Auth from "./api/Auth";
import FS from "./api/FS";
import formidable from "formidable";

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
      res.send(data);
    } else {
      res.send(data);
    }
  });
});

app.post("/upload", function (req, res) {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
    uploadDir: "./temp",
    maxFileSize: 5 * 1024 * 1024 * 1024,
  });
  form.parse(req, function (err, fields, files) {
    const { username, publicKey } = fields;
    Auth.auth(username.toString(), publicKey.toString()).then((data) => {
      if (data.error) {
        console.log(data.error);
        res.status(401);
        res.send(data.error);
        return;
      }
      const fileArr = [];
      if (files.file instanceof Array) {
        files.file.forEach((file) => {
          fileArr.push(file);
        });
      } else {
        fileArr.push(files.file);
      }
      FS.saveFiles(username.toString(), fileArr);
      res.send({ message: `Succesfully uploaded ${fileArr.length}file(s)` });
    });
  });
});

app.post("/files", function (req, res) {
  const { username, publicKey, directory } = req.body;
  Auth.auth(username.toString(), publicKey.toString()).then((data) => {
    if (data.error) {
      res.status(401);
      res.send(data.error);
      return;
    }
    const { files, folders } = FS.getFiles(username, directory);
    res.send({ files, folders });
  });
});

app.post("/files/*", function (req, res) {
  const { username, publicKey, directory } = req.body;
  Auth.auth(username.toString(), publicKey.toString()).then((data) => {
    if (data.error) {
      res.status(401);
      res.send(data.error);
      return;
    }
    const files = FS.getFiles(username, directory);
    res.send({ files: files });
  });
});

app.post("/createFolder", (req, res) => {
  const { username, publicKey, directory, folderName } = req.body;
  Auth.auth(username.toString(), publicKey.toString()).then((data) => {
    if (data.error) {
      res.status(401);
      res.send(data.error);
      return;
    }
    FS.createFolder(username, directory, folderName);
    res.send({ message: "Folder created" });
  });
});

app.get("/status", (req, res) => {
  res.send(JSON.stringify({ status: "API is running" }));
});

app.listen(5001, () => {});
