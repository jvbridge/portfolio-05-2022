const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
require("dotenv").config(); // configuring dotenv

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars engine
const hbs = exphbs.create({ defaultLayout: "main", extname: ".hbs" });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
});
