import { io } from "socket.io-client";
import {useEffect } from "react";

const socket = io("https://back.zoanfruit.xyz");

export function Connection({id,setId,setPosition,setColor,setTurn,room,setRoom}) {
    useEffect(() => {

      // Attach event listeners
        socket.on(id,(res)=>{
          setRoom(res[0]);
          setPosition(res[1]);
          setColor(res[2]);
          setTurn(res[3]);

          socket.on(res[0],(res1)=>
          {
            setPosition(res1);
            setTurn(prev=>!prev);
          })
      })
      // Cleanup logic
      return () => {
        socket.off(id);
        socket.off(room);
      };
    }, [id,room]);
    useEffect(()=>
    {
      socket.emit(id,'');
    },[id])
    useEffect(()=>
    {
      GetId({setId})
    },[]);
  }

  async function GetId({setId})
  {
    const response = await fetch('https://back.zoanfruit.xyz/getid');
    const json = await response.json();
    setId(json.playid);
  }

  export function Turn({room,turn,new_position})
  {
    socket.emit(room,{turn,new_position});
  }