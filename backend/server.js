const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs'); //for importing all routes


//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(()=> console.log('Database connected'))
.catch((err) => console.log(`Database connection error: ${err}`));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

//routes middleware (/Reading all routes at once)
readdirSync('./routes').map((r)=> app.use('/api',require(`./routes/${r}`))); 



//port
const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Server running on PORT: ${port}`));
