const express = require('express');
const apiRouter = require('./routes');

const app = express();
var cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api', apiRouter )

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}` );
});