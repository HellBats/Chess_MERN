
const http = require("http");
const path = require('path')
const express = require("express");
const {Server} = require('socket.io');
const {Color} = require('./ColorPicker.cjs')
const {Rotate} = require('./BoardRotater.cjs')
const { GenerateId, Push, players,rooms,Pop} = require("./Functions.cjs");
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors:{
            origin: "*"
        }
});
let connections =  0;


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/getid',(req,res)=>
{
    let PlayerId = GenerateId(6);
    Push(players,PlayerId);
    res.json({playid:PlayerId});
});


io.on('connection',(socket)=>
{
    console.log('A user connected');
    socket.on(players[connections],()=>
    {
        if(connections%2==0)
        {
            Push(rooms,GenerateId(2));
        }
        connections++;
        socket.emit(players[connections-1],connections==1?[rooms[0],Color(true),true,true]:[rooms[0],Color(false),false,true]);
        console.log(rooms[0]+players[connections-1]);
        socket.on(rooms[0],({turn,new_position:position})=>
        { 
            console.log(rooms[0]);
            socket.broadcast.emit(rooms[0],Rotate({position}));
        })
    })
    socket.on('disconnect',()=>
    {
        console.log(connections);
        Pop(players);
        if(connections>0)connections--;
    })
});


server.listen(3000,()=>{console.log("Started Listening...")});