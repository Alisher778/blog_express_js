var express = require('express');
var app = express();
var posts = require('./views/dataBase.json'); 

app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// app.set('views', __dirname + '/template'); // IF you want to change views into another folder
app.use('/static', express.static(__dirname+'public'));

app.get('/', function(req, res){
  res.render('index', {posts:posts});
});

var posts=[{
      "title": "First officail title",
      "message": "HI. it is so fun to creat a post using express_js"
    },
    {
      "title": "About Node JS",
      "message": "I am using NOde JS and very fasinatng to see how powerful is!"
    }]

app.get('/blog', function(req, res){
  res.render('show', {posts: posts})
});

app.get('/create', function(req, res){
  console.log('localhost:3000/blog is being requested...');
  res.render('blog');

});
app.post('/sent', function(req, res){
  posts.push(req.body);
  console.log(posts);
  res.redirect('/blog');
});

app.listen(3000);

