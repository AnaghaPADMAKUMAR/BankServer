//importing express
const express=require('express')

//import env file
require('dotenv').config()

//import cors
const cors=require('cors')

//import db connection
require('./db/dbconnection')

//import router
const rout=require('./routes/userRouting')
const jwtMiddleware = require('./middlewares/routerMiddleware')
//server.use(jwtMiddleware())

//create server using express
const server=express()

//connect with frontend
server.use(cors())

//to convert all incoming json type data into javascript
server.use(express.json())

server.use(rout)

// server.get('/excgetpath/newuser',(req,res)=>{
//     res.send("get request response...")
// })

// server.get('/excgetpath/lastuser',(req,res)=>{
//     res.send("get request response 2...")
// })

//port set for running
const port=3004 || process.env.port

//running config
server.listen(port,()=>{
    console.log(`______Server started at Port Number ${port}_________`);
})