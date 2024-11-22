var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
)

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

var bodyParser = require('body-parser');
var resourceRouter = require('./routes/resource');

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kittenRouter = require('./routes/kitten');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var Kitten = require("./models/kitten");

// Async function to recreate the database
async function recreateDB() {
  try {
    // Delete all existing documents in the collection
    await Kitten.deleteMany();
    console.log("All existing kittens deleted.");

    // Create new instances of the Kitten model
    let kitten1 = new Kitten({ name: "Fluffy", age: 2, owner_name: "Alice" });
    let kitten2 = new Kitten({ name: "Whiskers", age: 1, owner_name: "Bob" });
    let kitten3 = new Kitten({ name: "Mittens", age: 3, owner_name: "Charlie" });

    // Save the instances
    await kitten1.save();
    await kitten2.save();
    await kitten3.save();

    console.log("Kittens saved to database.");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

// Call the function to seed data
let reseed = true;
if (reseed) {
  recreateDB();
}

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kitten', kittenRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);
app.put('/kitten/:id', kitten_controlers.kitten_update_put);

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(function(req, res, next) {
  console.log(`Request URL: ${req.originalUrl}`);
  next(createError(404));
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
