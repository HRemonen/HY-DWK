import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import express from "express";
import request from "request";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const imgPath = path.join(directory, "image.jpeg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(imgPath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const downloadImage = async (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

const downloadImageNow = async () => {
  const fileExists = await fileAlreadyExists();

  if (!fileExists) {
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) console.error(err);
    });
  }

  downloadImage("https://picsum.photos/1200", imgPath, () => {
    console.log("Image downloaded");
  });
};

downloadImageNow();

setInterval(async () => {
  await downloadImageNow();
}, 60 * 60000);

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("files"));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const todos = await axios
    .get("http://dwkproject-backend-svc:2345/todos")
    .then((response) => response.data.data)
    .catch((err) => console.error(err));

  res.render("index", { title: "DWK project", message: "Hello world!", todos });
});

app.post("/", async (req, res) => {
  const { title } = req.body;

  await axios
    .post("http://dwkproject-backend-svc:2345/todos", { title })
    .then((response) => {
      console.log("Todo created: " + title);
    })
    .catch((err) => console.error(err));

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
