const express = require("express");
const { connectDB } = require("./db/connectDB");
const userRoutes = require("./routes/user");
const session = require("express-session");
const noCache = require("nocache");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//session
app.use(
  session({
    secret: "SecretKey",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(noCache());

app.use("/", userRoutes);

connectDB();
app.listen(3001, () => console.log("server is running"));
