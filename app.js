var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.locals.moment = require('moment');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.set('view engine', 'ejs');
// app.set('views', __dirname + '/template'); // IF you want to change views into another folder
app.use('/public', express.static(path.join(__dirname + '/public')));


//Root path
app.get('/', function(req, res){
  res.render('index', {posts:posts});
});



// This is a dummy data
var posts=[{
      "title": "6 things you should know about Node.js",
      "message": "JavaScript is eating the world, with new tools and enhancements arriving at a breakneck pace. With Node.js, an open source runtime system invented in 2009 by Ryan Dahl, that reach has extended to the server side.Node.js has become wildly popular, with coders everywhere using it to create APIs and build a new matrix of interoperability across the Internet. Joyent has been the chief sponsor of Node.js from the beginning. In this week's New Tech Forum, Ben Wen, vice president of product marketing at Joyent, outlines six things you should know about the phenomenon shaking up backend development. -- Paul VeneziaNode.js is a runtime system for creating (mostly) server-side applications. It's best known as a popular means for JavaScript coders to build real-time Web APIs.",
      "timestamp": "Sun Nov 13 2016 20:34:17 GMT-0500 (EST)"

    },
    {
      "title": "Interesting question why JavaScript is everywhere",
      "message": "JavaScript is a quirky, object-oriented, C-like language. It's the only choice for developing applications in the browser, with a new framework introduced every week to woo developers. And with Node.js, JavaScript has spilled over to the server. Competing implementation teams have driven JavaScript interpreters forward, so that Google's V8 engine is respectably fast -- fast enough to reside at the core of Node.js.JavaScript also has the internal capability to handle the event loop mechanism in a straightforward way. Other languages have this capability, which are used by their own evented systems. Python has Twisted and Ruby has EventMachine. But because of history, both of those event-loop systems come freighted with relatively easy ways to make a particular kind of performance mistake, while JavaScript remains relatively free of this peril.",
      "timestamp": "Sun Nov 13 2016 20:34:17 GMT-0500 (EST)"
    }]


app.get('/posts/:title', function(req, res){
  var title = req.params.title;
  var body = posts[title];
  console.log(title);
  res.redirect('/blog');
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
    title:req.body.title,
    message:req.body.message,
    timestamp: new Date(), 
  };
  console.log(newPosts);
  posts.push(newPosts);
  res.redirect('/blog');
});

app.listen(3000);

