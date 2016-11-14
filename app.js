var express = require('express');
var app = express();
var fs = require('fs');


app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs');
// app.set('views', __dirname + '/template'); // IF you want to change views into another folder
app.use('/static', express.static(__dirname+'public'));


//Root path
app.get('/', function(req, res){
  res.render('index', {posts:posts});
});



// This is a dummy data
var posts=[{
      "id":"",
      "title": "First officail title",
      "message": "HI. it is so fun to creat a post using express_js",
      "timestamp": "Sun Nov 13 2016 20:34:17 GMT-0500 (EST)"

    },
    {
      "id":"",
      "title": "About Node JS",
      "message": "I am using NOde JS and very fasinatng to see how powerful is!",
      "timestamp": "Sun Nov 13 2016 20:34:17 GMT-0500 (EST)"
    }]


app.get('/posts/:title', function(req, res){
  
  var title=
    req.query.title;
  res.render('queryPage', {post:posts});
})



app.get('/blog', function(req, res){
  res.render('show', {posts: posts})
});



app.get('/create', function(req, res){
  console.log('localhost:3000/blog is being requested...');
  res.render('blog');

});


app.post('/sent', function(req, res){
  var newPosts = {
    id:"",
    title:req.body.title,
    message:req.body.message,
    timestamp: new Date(), 
  };
  posts.push(newPosts);
  res.redirect('/blog');
});

app.listen(3000);

