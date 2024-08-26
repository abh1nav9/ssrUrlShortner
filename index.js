const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const PORT = 8000;

connectToMongoDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/url", urlRoute);
app.use("/", staticRoute);

// app.get("/test", async (req, res) => {
//     const allUrl = await URL.find({});
//     return res.render("home", {
//         urls: allUrl,
//     });
// });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));

