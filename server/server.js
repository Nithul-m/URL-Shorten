import express from "express";
import mongoose from "mongoose";
import shortUrl from "./model/shortStore.js";
import cors from "cors";


const app = express();

await mongoose.connect("mongodb+srv://mnithul:Sathooo2@cluster0.urs1evf.mongodb.net/urlShortsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((console.log("mongodb connected")))

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "https://url-react.onrender.com",
    methods:["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.post("/short", async (req, res) => {
  const found = await shortUrl.find({ full: req.body.full });
  if (found.length > 0) {
    res.send(found);
  } else {
    await shortUrl.create({ full: req.body.full });
    const foundNow = await shortUrl.find({ full: req.body.full });
    res.send(foundNow);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const short = await shortUrl.findOne({ short: req.params.shortUrl });
  if (short == null) return res.sendStatus(404);
  res.redirect(`${short.full}`);
});




let port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started successfully on port:", port);
});

