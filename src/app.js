const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Man Ngoc, Nguyen",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Man Ngoc, Nguyen",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "What do you need?",
        name: "Man Ngoc, Nguyen",
    });
});

app.get("/weather", (req, res) => {
    // res.send([
    //     {
    //         forecast: "It is snowing",
    //         location: "Vietnam",
    //     },
    // ]);

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    // console.log(req.query.address);
    // res.send({
    //     products: [
    //         {
    //             forecast: "It is snowing",
    //             location: "Vietnam",
    //             address: req.query.address,
    //         },
    //     ],
    // });

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

// app.get("", (req, res) => {
//     res.send("<h1>Weather<h1>");
// });

// app.get("/help", (req, res) => {
//     res.send([
//         {
//             name: "Man Nguyen",
//             age: 27,
//         },
//         {
//             name: "Sarah",
//         },
//     ]);
// });

// app.get("/about", (req, res) => {
//     res.send("<h1>This is about page<h1>");
// });

// app.com
// app.com/help
// app.com/about

app.get("/help/*", (req, res) => {
    // res.send("Help article not found");
    res.render("404", {
        title: "404",
        name: "Man Nguyen",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    // res.send("My 404 page");
    res.render("404", {
        title: "404",
        name: "Man Nguyen",
        errorMessage: "Page not found",
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
