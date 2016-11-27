var express = require('express');
var app = express();

var pg = require('pg');
// For file uploading
// var multer = require('multer');
// var upload = multer({dest: 'uploads/'});

var Sequelize = require('sequelize');
var database = 'sqlite://database.sqlite3';
var sequelize = new Sequelize(process.env.DATABASE_URL);

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');


app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 3000));
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
    res.render('post/index', {post:posts});
  });
});

//Form for creating posts
app.get('/create', function(req, res){
  var Post = sequelize.define('post', {
    title: Sequelize.STRING,
    message: Sequelize.TEXT
  });
  res.render('post/new');
})


//Post a post

app.post('/sent', function(req, res){
  sequelize.sync().then(function(){
    return Post.create({
      title: req.body.title,
      message: req.body.message
    }).then(function(posts){
      res.render('post/show', {post: posts});
    });
  });
});

//Link for show page
app.get('/post/:id', function(req, res){
    Post.findById(req.params.id).then(function(posts){
      res.render('post/show', {post: posts});
    });
});


//Edit page and ation
app.get('/post/edit/:id', function(req, res){
    Post.findById(req.params.id).then(function(posts){
      res.render('post/edit', {post: posts});
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



//////////Contact page 

app.get('/contact', function(req, res){
  res.render('pages/contact');
});

//send
app.post('/email', function(req, res){

})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


