import { io } from "socket.io-client";
import {useEffect, useState } from "react";

const socket = io("https://back.zoanfruit.xyz");

export default function Connection({id,setId,position,setPosition,color,setColor,turn,setTurn}) {
  const [InitialMount,setMount] = useState(0);
    useEffect(() => {
      const handleConnect = () => {
        socket.emit('welcome', '');
      };
      const handleTakeId = (msg) => {
        setId(()=>{
        socket.emit(msg, color);
        socket.on(msg, handleSocketEvent);
        return msg
        })
      };

      const handleSocketEvent = (res) => {
        setPosition(res[0]);
        setColor(res[1]);
        setTurn(res[2]);
      };

      const handleTurns = (res) => {
        console.log("Done!");
        setPosition(res[1]);
        setTurn(res[0]);
      }


      // Attach event listeners
      socket.on('take id', handleTakeId);
      socket.on('connect', handleConnect);
      socket.on(id+'move',handleTurns);
      // Cleanup logic
      return () => {
        socket.off('take id', handleTakeId);
        socket.off(id, handleSocketEvent);
        socket.off('connect', handleConnect);
      };
    }, [id,turn]);
    useEffect(()=>
    {
      if(InitialMount<(color?2:3))
      {
        console.log(InitialMount);
        setMount(InitialMount+1);
        return;
      }
      setMount(color?1:2);
      Turn({id,turn,position})
    },[position])
  }

  export function Turn({id,turn,position})
  {
    socket.emit(id+'move',{turn,position});
  }