import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clock_time, mytime,optime } from "../Store/Atoms/TimeAtoms";
import { Id, color, gameover, gameovermessage, turn } from "../Store/Atoms/UtilityAtoms";
import { GameOverEvent } from "./FirstConnection";

export function ControlTimer()
{
    const [mytime_,setMytime] = useRecoilState(mytime);
    const clock_times = useRecoilValue(clock_time);
    const color_ = useRecoilValue(color);
    const turn_ = useRecoilValue(turn);
    const id = useRecoilValue(Id);
    const setGameOver = useSetRecoilState(gameover);
    const setGameOverMessage = useSetRecoilState(gameovermessage);
    useEffect(() => {
        if (mytime_.length === 0) {
            setMytime(clock_times);
        }
    
        const timeoutId = setTimeout(() => {
            updateClockTime(turn_,color_,mytime_,setMytime,id,setGameOver,setGameOverMessage);
        }, 1000);
    
        return () => clearTimeout(timeoutId);
      }, [mytime_,turn_]); // Re-run the effect when mytime or turn changes
}

export function ControlOpTimer()
{
    const [optime_,setOptime] = useRecoilState(optime);
    const clock_times = useRecoilValue(clock_time);
    const color_ = useRecoilValue(color);
    const turn_ = useRecoilValue(turn);
    const id = useRecoilValue(Id);
    const setGameOver = useSetRecoilState(gameover);
    const setGameOverMessage = useSetRecoilState(gameovermessage);

    useEffect(() => {
        if (optime_.length === 0) {
            setOptime(clock_times);
        }
    
        const timeoutId = setTimeout(() => {
            updateOpClockTime(turn_,color_,optime_,setOptime,id,setGameOver,setGameOverMessage);
        }, 1000);
    
        return () => clearTimeout(timeoutId);
      }, [optime_,turn_]); // Re-run the effect when mytime or turn changes
}


function updateClockTime(turn,color,mytime,setMytime,id,setGameOver,setGameOverMessage) {
    if (!((turn && color) || (!turn && !color))) return; // Stop the timer if turn is false

    let new_time = mytime.slice(); // Make a copy of the clock_time array
    if (new_time[1] === 0) 
    {
        new_time[0] -= 1;
        new_time[1] = 59;
    } 
    else {
        new_time[1] -= 1;
    }
    if(new_time==[0,0]) 
    {
        GameOverEvent({id,msg:'You Won'});
        setGameOver(true);
        setGameOverMessage('You Lost');
    }
    setMytime(new_time); // Update state with the new time
    }

function updateOpClockTime(turn,color,optime,setOptime,id,setGameOver,setGameOverMessage) {
    if ((turn && color) || (!turn && !color)) return; // Stop the timer if turn is false

    let new_time = optime.slice(); // Make a copy of the clock_time array
    if (new_time[1] === 0) 
    {
        new_time[0] -= 1;
        new_time[1] = 59;
    } 
    else {
        new_time[1] -= 1;
    }
    if(new_time==[0,0]) 
    {
        GameOverEvent({id,msg:'You Lost'});
        setGameOver(true);
        setGameOverMessage('You Won');
    }
        setOptime(new_time); // Update state with the new time
    }