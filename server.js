var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
// Our scraping tools

var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
// const databaseUrl = "scraper";
// const collections = ["scrapedJokes"];

// const db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapeThis";



mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./routes/apiRoutes.js")(app)
require("./routes/viewRoutes.js")(app)

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});