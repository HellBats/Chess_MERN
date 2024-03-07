
const http = require("http");
const path = require('path')
const express = require("express");
const {Server} = require('socket.io');
const {Color} = require('./ColorPicker.cjs')
const {Rotate} = require('./BoardRotater.cjs')

const app = express();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors:{
            origin: "*"
        }
});
let connections =  0;



app.use(express.static(path.join(__dirname, 'public')));


io.on('connection',(socket)=>
{
    const id = "lundlele"
    console.log('A user connected');
    socket.on('welcome',()=>
    {
        if(connections<2)
        {
            connections++;
            socket.emit('take id',id);
        }
    })
    socket.on(id,(msg)=>
    {
        socket.emit(id,connections==1?[Color(true),true,true]:[Color(false),false,true]);
    })
    socket.on(id+'move',({turn,position})=>
    { 
        console.log('message came');
        socket.broadcast.emit(id+'move',[turn,Rotate({position})]);
    })
    socket.on('disconnect',()=>
    {
        console.log(connections);
        connections--;
    })
});


server.listen(3000,()=>{console.log("Started Listening...")});