const path = require("path");
const hbs = require("hbs");
const express = require("express");
const { forecast } = require("./utils/forecast");
const { geocode } = require("./utils/geocode");

const app = express();

// For heroku
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nirmalya Ganguly",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nirmalya Ganguly",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Nirmalya Ganguly",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    message: "Help article not found",
    name: "Nirmalya Ganguly",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide a location to get the weather details",
    });
  }

  geocode(req.query.location, (error, response) => {
    if (error) {
      return res.send({
        error,
      });
    }

    const { latitude, longitude, place } = response;

    forecast(latitude, longitude, place, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: data,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    message: "This page cannot be found",
    name: "Nirmalya Ganguly",
  });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
