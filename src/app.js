import express,{json} from 'express';
import morgan from 'morgan';
import sourceRoute, { initPassport } from './routes/source.routes';
import session from 'express-session';

const app = express()

//middlewares
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('src'));
app.use(morgan('dev'))
app.use(json())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
initPassport(app)

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');// Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');// Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');// Request headers you wish to allow
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use( (err, req, res, next) => { 
    res.status(err.status || 500)
    res.render('error', { 
      message: err.message, 
      error: {} 
    }); 
  }); 
//routes
app.use('/', sourceRoute)

export default app