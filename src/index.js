require('dotenv').config()
const express = require('express');
const apiRouter = require('./routes');
var cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')


const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter )
app.use(errorMiddleware); // Middleware mistakes should come last in the chain of others

app.use(express.static(path.join(__dirname, 'build')));
/*
app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "https://bins-collection-ui.herokuapp.com"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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