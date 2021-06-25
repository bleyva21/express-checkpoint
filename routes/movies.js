var express = require('express');
const app = express()
var router = express.Router();
var movies = require('../mock-data/movies.json')
const bodyParser = require('body-parser');
const { rawListeners } = require('../app');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  if(req.query.title){
    console.log(req.query.title)
    const filteredName = movies.filter((obj)=>obj.title.includes(req.query.title)
    ); 
    res.send(filteredName)
  }
  else if (movies){
  res.json(movies);
  } else {
    res.status(404).send('Movies not found')
  }
});

router.get('/:id', function(req, res, next) {
  if(req.params.id > movies.length){
    res.status(404).send('Movies ID not found')

  }
  else if(isNaN(parseInt(req.params.id))) {
    res.status(400).send('Invalid ID')
  }else {
    res.status(200)
    res.json(movies[req.params.id-1]);
  }
});

router.post('/', function (req, res, next) {
  let newMovies = movies;
  req.body.id = newMovies.length+1
  newMovies.push(req.body)
  newMovies=JSON.stringify(newMovies)
  console.log(newMovies)
  // fs.writeFile('../mock-data/movies.json', newMovies, (err) => {
  //   if(err){
  //     throw(err)
  //   }
  // })
  res.json(req.body)
  /* POST user data using the request body */
})

/* router.get('/?title={titleQuery}', function(req,res){
if(req.query.titleQuery){
  const filteredName = movies.filter((obj)=>obj.name.includes(req.query.titleQuery)
  );
  res.send(filteredName)
}

}) */

module.exports = router;