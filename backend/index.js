const dotenv = require('dotenv');
dotenv.config()

const express = require('express')
const cors= require('cors');
const mongoDB =require('./database')


// import users from './routes/users.js';
// import path from  'path';


const app =express();
const port = process.env.PORT;
// connectDB(DATABASE_URL);

// Cors policy
app.use(cors());

//Database connection
 mongoDB()

//JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Load routes 
app.use('/',()=>{
    console.log("hello moto")
})


app.listen(port,() => {
    console.log(`Server Listening at http://localhost:${port}`)
});