var express = require('express');
var app = express();
var fs = require('fs');


// For file uploading
var multer = require('multer');
var upload = multer({dest: './public/uploads/'});

var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
var Sequelize = require('sequelize');
var databaseURL = 'sqlite://database.sqlite3';
var sequelize = new Sequelize(process.env.DATABASE_URL || databaseURL);


app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
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

app.post('/post/update/:id', function(req, res){
  console.log(req.body);
  return Post.update({
    title: req.body.title,
    message: req.body.message },
    {
      where: {
        id: req.params.id
      }
    }).then(function(){
      res.redirect('/');
      console.log(req.body);
    })
})

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



// User Page .........................

app.get('/users', function(req, res){
  User.findAll().then(function(users){
    res.render('user/index', {user: users})
  });
});

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    bio: Sequelize.TEXT
  });

app.get('/sign_up', function(req, res){
  res.render('user/new');
});

app.post('/user/sign_up', function(req, res){
  sequelize.sync().then(function(){
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio
    }).then(function(users){
      res.render('user/show', {user:users});
    });
  });
});

app.get('/user/:id', function(req, res){
  User.findById(req.params.id).then(function(users){
    res.render('user/show', {user: users});
  });
});

var loggedInUser = {};

app.post('/log_in', function(req, res){
  var sessionId = genRandomCode();
  loggedInUser[sessionId] = UserId;
});

app.get('/inbox', function(req, res){
  var sessionId = req.querystring.sessionId;
  var userId = loggedInUser[sessionId];

  if(userId == null){
    res.status(401).send('Not Logged in!!!');
    return;
  }
});

// Upload images
app.get('/image', function(req, res){
  res.render('user/upload');
})
app.post('/upload', upload.single('image'), function(req, res){
  console.log(req.file);
  console.log(req.file.originalname);
  
  fs.rename(req.file.filename, req.file.originalname, function(){
    console.log('succesfull');
  })
  res.send(req.file.path)
})

app.get('/user/destroy/:id', function(req, res){
  User.destroy({where:{
                        id: req.params.id
    }
  }).then(function(){
    res.redirect('/users');
  });
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


