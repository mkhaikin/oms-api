require('dotenv').config()
const express = require('express');
const apiRouter = require('./routes');
var cors = require('cors');
const path = require('path')
//const cookieParser = require('cookie-parser')
//const errorMiddleware = require('./middleware/error-middleware')


const app = express();
/* */
app.use(cors({
    origin: 'https://keen-brown-026739.netlify.app',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
/**/
//app.use(cors({credentials: true,}));
//app.options('https://keen-brown-026739.netlify.app', cors())
//app.use(cors());

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
//app.use(cookieParser());

app.use('/api', apiRouter )
//app.use(errorMiddleware); // Middleware mistakes should come last in the chain of others

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  next()
});
app.use(function(req, res, next) {
  /*
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
    )
    */
    res.header("Access-Control-Allow-Origin", 'https://keen-brown-026739.netlify.app');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Credentials", true); <--- this is the only different line I added.
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
   
    next()
  });


const start = async() =>{
    try{
        app.listen(process.env.PORT || '3000', () => {
            console.log(`Server is running on port: ${process.env.PORT || '3000'}` );
        });
    } catch (e){
        console.log(e)
    }
}

start()