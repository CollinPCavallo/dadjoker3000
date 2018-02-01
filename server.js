//packages
const express = require('express');
const mongojs = require('mongojs');
const request = require('express');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

//init express
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const databaseUrl = "scraper";
const collections = ["scrapedData"];

const db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/scrape', (req, res) => {
    request('https://www.reddit.com/r/dadjokes/', (error, response, html) => {
        
    const $ = cheerio.load(html);

        $('p.title').each((i, element) => {
            const link = $(element).children().attr('href');
            const title = $(element).children().text();

            db.scrapedData.insert({ "link": link, "title": title })

        })
        console.log('results')
    })
});

app.listen(3000, function () {
    console.log("App running on port 3000!");
});