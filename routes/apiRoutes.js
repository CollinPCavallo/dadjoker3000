var db = require("../models")
const request = require('request');
const cheerio = require('cheerio');
module.exports = function (app) {
  app.get('/scrape', (req, res) => {
    request('https://www.reddit.com/r/dadjokes/', (error, response, html) => {

      const $ = cheerio.load(html);

      $('p.title').each((i, element) => {

        let results = {}
        results.title = $(element).children().text();
        results.link = $(element).children().attr('href');
        console.log(results)
        db.Joke.create(results)
          .then((dbJoke) => {
            console.log(db.Joke)
          })
          .catch(err => res.json(err));
      });
      res.redirect("/jokes");
    });
  });
  app.get('/jokes', (req, res) => {
    db.Joke.find({})
      .then((dbJoke) => {
        var jokes = {
          jokes: dbJoke
        }
        res.render('index', jokes);
      }).catch(err => {
        res.json(err)
      });
  });

  app.get("/jokes/:id", function (req, res) {
    db.Joke.findOne({ _id: req.params.id })
      .populate("note")
      .then(function (dbJoke) {
        res.json(dbJoke);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.post('/jokes/:id', (req, res) => {
    db.Note.create(req.body)
      .then(dbNote => db.Joke.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true }))
      .then(dbJoke => {
        res.json(dbJoke)
      }).catch(err => {
        res.json(err)
      })
  })

}