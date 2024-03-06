const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
require("./db/database");

const app = express();
const PORT = process.env.PORT;
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        name: process.env.SECRETNAME,
    })
);

app.use(flash());

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/home")); // / significa url base
app.use("/auth", require("./routes/auth")); //el /auth seria la url base

app.use(express.static(__dirname + "/public"));
app.listen(PORT);
