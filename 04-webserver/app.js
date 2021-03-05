const express = require("express");
const hbs = require("hbs");
const app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs");

// static
app.use(express.static("public"));

app.get("/", (req, res) => {

    res.render("home", {
        name: "Hozanno Raphael",
        title: "Node course"
    });
});

app.get("/generic", (req, res) => {

    res.render("generic", {
        name: "Hozanno Raphael",
        title: "Node course"
    });
});

app.get("/elements", (req, res) => {

    res.render("elements", {
        name: "Hozanno Raphael",
        title: "Node course"
    });
});

app.get("*", (req, res) => {

    res.json({
        ok: false,
        msg: "404 | Page not found"
    })
})
app.listen(8080);
