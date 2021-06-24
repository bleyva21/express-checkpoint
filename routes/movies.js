var express = require('express');
const app = express()
var router = express.Router();
var movies = require('../mock-data/movies.json')
const bodyParser = require('body-parser');
const { rawListeners } = require('../app');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  if(req.query.title){
    console.log(req.query.title)
    const filteredName = movies.filter((obj)=>obj.title.toLowerCase().includes(req.query.title)
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

/* router.get('/?title={titleQuery}', function(req,res){
if(req.query.titleQuery){
  const filteredName = movies.filter((obj)=>obj.name.includes(req.query.titleQuery)
  );
  res.send(filteredName)
}

}) */

module.exports = router;
