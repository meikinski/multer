const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${+Date.now()}`);
  },
});

const app = express();
const port = 8000;
const upload = multer({ storage });

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  console.log(req.file);
  res.send("profile pic uploaded");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
