
const http = require("http");
const path = require('path')
const express = require("express");
const {Server} = require('socket.io');
const {Color} = require('./ColorPicker.cjs')
const {Rotate} = require('./BoardRotater.cjs')
const cors = require('cors');
const { GenerateId } = require("./Functions.cjs");

let rooms = [];
let players = [];

const app = express();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors:{
            origin: "*"
        }
});


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/getid',(req,res)=>
{
    let PlayerId = GenerateId(6);
    players.push(PlayerId);
    res.json({playid:PlayerId});
});



io.on('connection',(socket)=>
{
    socket.on('join',(playerId,clock_time)=>
    {
        if(players.includes(playerId))
        {
            let space_in_room = false; 
            for(let room of rooms)
            {
                if(room[2].length==0 && clock_time==room[3])
                {
                    space_in_room = true;
                    room[2] = [playerId,socket.id];
                    socket.join(room[0]);
                    let color_pick= Math.random()>0.5?true:false;
                    io.to(room[0]).emit(room[1][0]+'first',[Color(!color_pick),!color_pick,true]);
                    io.to(room[0]).emit(room[2][0]+'first',[Color(color_pick),color_pick,true]);
                    break;
                }
            }
            if(!space_in_room)
            {
                let roomID = GenerateId(6);
                rooms.push([roomID,[playerId,socket.id],[],clock_time]);
                socket.join(roomID);
            }
        }
    });
    socket.on('move',({id:player,new_position:position})=>
    { 
        for(let room of rooms)
        {
            if(room[1][0]==player){
                io.to(room[0]).emit(room[2][0],Rotate({position}));
            }
            else if(room[2][0]==player){
                io.to(room[0]).emit(room[1][0],Rotate({position}));
            }
        }
    })
    socket.on('gameover',(msg)=>
    {
        console.log(rooms);
        for(let room of rooms)
        {
            if(room[1][0]==msg[0]){
                io.to(room[0]).emit(room[2][0]+'gameover',msg[1]);
            }
            else if(room[2][0]==msg[0]){
                io.to(room[0]).emit(room[1][0]+'gameover',msg[1]);
            }
        }
    })
    socket.on('disconnect',()=>
    {
        for(let room in rooms)
        {
            if(rooms[room][1][1]==socket.id)
            {
                players.splice(players.indexOf(rooms[room][1][0]),1);
                rooms[room][1][0] = '';
                if(rooms[room][2][0]=='')
                {
                    rooms.splice(room,1);
                }
                else
                {
                    io.to(rooms[room][0]).emit(rooms[room][2][0]+'gameover','you won');
                }
            }
            else if(rooms[room][2][1]==socket.id)
            {
                players.splice(players.indexOf(rooms[room][2][0]),1);
                rooms[room][2][0] = '';
                players.pop(rooms[room][1][0]);
                if(rooms[room][1][0]=='')
                {
                    rooms.splice(room,1);   
                }
                else
                {
                    io.to(rooms[room][0]).emit(rooms[room][1][0]+'gameover','you won');
                }
            }
        }
    })
});



server.listen(3000,()=>{console.log("Started Listening...")});