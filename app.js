var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var database = 'sqlite://database.sqlite3';
var sequelize = new Sequelize(database);

app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ---------Defining database --------

var Post = sequelize.define('post',{
  title: Sequelize.STRING,
  message: Sequelize.TEXT
});







app.set('view engine', 'ejs');
// app.set('views', __dirname + '/template'); // IF you want to change views into another folder
app.use('/public', express.static(__dirname + '/public'));


//Root path
app.get('/', function(req, res){
  Post.findAll().then(function(posts){
    res.render('index', {post:posts});
  });
});

//Form for creating posts
app.get('/create', function(req, res){
  var Post = sequelize.define('post', {
    title: Sequelize.STRING,
    message: Sequelize.TEXT
  });
  res.render('new');
})


//Post a post

app.post('/sent', function(req, res){
  sequelize.sync({force: true}).then(function(){
    return Post.create({
      title: req.body.title,
      message: req.body.message
    }).then(function(posts){
      res.render('show', {post: posts});
    });
  });
});

//Link for show page
app.get('/post/:id', function(req, res){
    Post.findById(req.params.id).then(function(posts){
      res.render('show', {post: posts});
    });
});


//Edit page and ation
app.get('/post/edit/:id', function(req, res){
    Post.findById(req.params.id).then(function(posts){
      res.render('edit', {post: posts});
    });
});

app.post('/post/update', function(req, res){
    Post.findById(req.params.id).then(function(posts){
      return posts.Update({
        title: req.body.title,
        message: req.body.message
      }).then(function(posts){
        res.redirect('/');
      });
    });
});

// Delete the post

app.get('/post/destroy/:id', function(req, res){
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/');
  });
});

app.listen(3000, function(){
  console.log('Application is running on localhost:3000')
});

