const express = require('express');
const app = express();
const path = require('path');
const todoRouter = require('./routes/todo');

app.use(express.json())

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req,res)=>{
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
})

app.use('/todo', todoRouter);

app.listen(3000, ()=> {
    console.log(`Server is Running!`);
})