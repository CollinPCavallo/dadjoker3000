var db = require("../models")
const request = require('request');
const cheerio = require('cheerio');
module.exports = function(app){
  app.get('/scrape', (req, res) => {
    request('https://www.reddit.com/r/dadjokes/', (error, response, html) => {

      const $ = cheerio.load(html);

      $('p.title').each((i, element) => {

        let results = {}
        result.link = $(this).children().attr('href');
        result.title = $(this).children().text();

        db.Joke.create(result)
        .then((dbJoke) => {
          console.log(db.Joke)
        }).catch(err => res.json(err));
      });
    });
    res.send('Scraped Punchlines');
  });
  app.get('/Jokes', (req, res) => {
    db.Joke.find({})
    .then((dbJoke) => {
      res.json(dbJoke)
    }).catch(err => {
      res.json(err)
    });
  });
  app.post('/jokes/:id', (req,res) => {
    db.Note.create(req.body)
    .then(dbNote => db.Joke.findOneAndUpdate({_id: req.params.id}, {node: dbNote._id}, {new: true}))
    .then(dbJoke => {
      res.json(dbJoke)
    }).catch(err => {
      res.json(err)
    })
  })

}