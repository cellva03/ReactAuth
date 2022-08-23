const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute')

// creating a new express application
const app = express();
app.use(cors());

// creating a application port and mongodb port
const PORT = process.env.PORT || 4001;
const DBURL = 'mongodb://0.0.0.0:27017/auth';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connecting to mongodb
mongoose.connect(DBURL,(e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log(`DataBase is Connected!!`)
        // listening to the port
        app.listen(PORT,()=>{
            console.log(`App is running on ${PORT}`)
        })
    }
})

app.use('/api/auth',authRoute)