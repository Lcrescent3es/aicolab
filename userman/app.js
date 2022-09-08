var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');


var app = express();
//여기서부터 내 코드

let userCounter = 0;
let users = [];

function getUserCounter(increment){ 
  userCounter = userCounter+increment;  
  return userCounter; 
}
function getUsers(){ 
  return users; 
}
function pushUser(user){ 
  users.push(user); 
  saveData(user);
}

function saveData(){ 
  console.log('Saving Data...');
  console.log(users.length);
  fs.writeFile('data.txt', JSON.stringify(users), (err)=>{
    if(err){
      console.log(err);
    }
  });
  console.log('Save Done!'); 
}
function loadData(){ 
  console.log('Load Data!');
  fs.readFile('data.txt', (err, file)=>{
    if(err){ console.log(err);
      return;
    }
    users = JSON.parse(file);
    userCounter=users.length;
  });
}

module.exports = {
  getUserCounter, 
  getUsers, 
  pushUser
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { syncBuiltinESMExports } = require('module');
const { resolve } = require('path');
const { fstat } = require('fs');

app.listen(12345, ()=>{
  loadData();
  console.log("server running..");
});


//여기까지
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.js에서는 root에 대해서 index, /users에 대해 usersRouter 두가지 지원
//우리는 index에 대한 처리는 없으니 users만 잘 처리하면 된다.
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //error 쉽게 확인가능
  console.log('Error Handled');
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

