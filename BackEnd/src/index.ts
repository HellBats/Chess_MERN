import { Socket } from "socket.io";

const path = require('path');
const express = require("express");
const cors = require('cors');
const {Server} = require('socket.io');
const {Color} = require('./Functions/ColorPicker')
const {Rotate} = require('./Functions/BoardRotater')
const { GenerateId,players,rooms } = require("./Functions/PlayersAndRooms");
const http = require('http');
const { router } = require("./Routes/index");


const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/',router)
const io = new Server(server,
    {
        cors:{
            origin: "*"
        }
});


io.on('connection',(socket:Socket)=>
{
    socket.on('join',(playerId:string,clock_time:string)=>
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
                io.to(room[0]).emit(room[2][0],Rotate(position));
            }
            else if(room[2][0]==player){
                io.to(room[0]).emit(room[1][0],Rotate(position));
            }
        }
    })
    socket.on('gameover',(msg:string)=>
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


server.listen(3001,()=>{console.log("Started Listening...")});