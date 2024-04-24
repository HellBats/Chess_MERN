import { io } from "socket.io-client";
import {useEffect} from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { Id, color, gameover, gameovermessage, turn } from "../Store/Atoms/UtilityAtoms";
import { positions } from "../Store/Atoms/PositionsAndCordsAtoms";
const socket = io("https://back.zoanfruit.xyz/");

interface TurnProps{
  id:string,
  new_position:[[[string,number,number]]]
}



export function useConnection() {
    const id = useRecoilValue(Id);
    const [colors,setColor] = useRecoilState(color);
    const [turn_,setTurn] = useRecoilState(turn);
    const setPosition = useSetRecoilState(positions);
    const [game_over,setGameOver] = useRecoilState(gameover);
    const [gameover_message,setGameOverMessage] = useRecoilState(gameovermessage);
    useEffect(() => {

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

      // Cleanup logic
      return () => {
        socket.off('move');
        socket.off(id+'first');
        socket.off(id+'gameover')
      };
    }, [id]);
    return {turn_,game_over,gameover_message};
  }

  export const Turn = ({id,new_position}:TurnProps) =>{
    socket.emit('move',{id,new_position});
  }

  export const JoinEvent = ({id,clock_time_}:{id:string,clock_time_:[number,number]})=>{
    socket.emit('join',id,clock_time_[0]);
  }

  export const GameOverEvent = ({id,msg}:{id:string,msg:string}) =>{
    socket.emit('gameover',[id,msg]);
  }