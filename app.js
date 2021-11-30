const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');


const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const session = require('express-session')

app.use(session({
  name: 'AuthCookie',   
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));
app.use('/user/private', (req,res,next) => {
  //console.log(req.session.user);
  if(!req.session.user){
    let title = "Error";
    let message = "You are not log in";
    res.status(403);
    res.render('error',{title:title,error:message});
  }else{
    next();
  }
});

configRoutes(app);


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });