import { io } from "socket.io-client";
import {useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {Id, color, gameover, gameovermessage, turn } from "../Store/Atoms/UtilityAtoms";
import { positions } from "../Store/Atoms/PositionsAndCordsAtoms";
import { useEffect } from "react";
const socket = io("https://back.zoanfruit.xyz/");

export function Connection() {
    const [colors,setColor] = useRecoilState(color);
    const id = useRecoilValue(Id);
    const setTurn = useSetRecoilState(turn);
    const setPosition = useSetRecoilState(positions);
    const setGameOver = useSetRecoilState(gameover);
    const setGameOverMessage = useSetRecoilState(gameovermessage);
    
    useEffect(()=>{
      if (id.length==0) return;
    // Attach event listeners
      socket.on(id+'first',(res)=>{
          setPosition(res[0]);
          setColor(res[1]);
          setTurn(res[2]);
      })

      socket.on(id,(res)=> 
      {
        setPosition(res);
        setTurn(prev=>!prev);
      })

      socket.on(id+'gameover',(msg)=>
      {
        console.log('socket');
        setTurn(!colors);
        setGameOver(true);
        setGameOverMessage(msg);
      })
      return ()=>{
        socket.off(id+'first')
        socket.off(id)
        socket.off(id+'gameover')
      }
    },[id])
  }

  export function Turn({id,new_position})
  {
    socket.emit('move',{id,new_position});
  }

  export function JoinEvent({id,clock_time_})
  {
    socket.emit('join',id,clock_time_[0]);
  }

  export function GameOverEvent({id,msg})
  {
    socket.emit('gameover',[id,msg]);
  }