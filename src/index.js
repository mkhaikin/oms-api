require('dotenv').config()
const express = require('express');
const apiRouter = require('./routes');
var cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')


const app = express();
/* */
app.use(cors({
    origin: 'https://keen-brown-026739.netlify.app',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
/**/
//app.use(cors({credentials: true,}));
//app.options('https://keen-brown-026739.netlify.app', cors())
//app.use(cors());

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cookieParser());

app.use('/api', apiRouter )
app.use(errorMiddleware); // Middleware mistakes should come last in the chain of others

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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