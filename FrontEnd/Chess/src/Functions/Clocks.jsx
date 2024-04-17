import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { clock_time, mytime,optime } from "../Store/Atoms/TimeAtoms";
import { Id, color, gameover, gameovermessage, turn,board_mounts} from "../Store/Atoms/UtilityAtoms";
import { GameOverEvent } from "./ConnectionFunctions";

export const ControlTimers = ()=>{
    const [mytime_,setMytime] = useRecoilState(mytime);
    const [optime_,setOptime] = useRecoilState(optime);
    const clock_times = useRecoilValue(clock_time);
    const color_ = useRecoilValue(color);
    const turn_ = useRecoilValue(turn);
    const id = useRecoilValue(Id);
    const setGameOver = useSetRecoilState(gameover);
    const setGameOverMessage = useSetRecoilState(gameovermessage);
    const board_mount = useRecoilValue(board_mounts)
    useEffect(() => {
        if(board_mount>1)
        {
            if (mytime_.length == 0) {
                setMytime(clock_times);
                setOptime(clock_times);
            }
        
            const timeoutId = setInterval(() => {
                if(((turn_ && color_) || (!turn_ && !color_)))
                {updateClockTime(mytime_,setMytime,id,setGameOver,setGameOverMessage);}
                else{updateOpClockTime(optime_,setOptime,id,setGameOver,setGameOverMessage);}
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
      }, [mytime_,optime_,turn_,board_mount]); // Re-run the effect when mytime or turn changes
}

function updateClockTime(mytime,setMytime,id,setGameOver,setGameOverMessage) {

    let new_time = mytime.slice(); // Make a copy of the clock_time array
    if (new_time[1] === 0) 
    {
        new_time[0] -= 1;
        new_time[1] = 59;
    } 
    else {
        new_time[1] -= 1;
    }
    if(new_time[0]==0 && new_time[1]==0) 
    {
        GameOverEvent({id,msg:'You Won'});
        setGameOver(true);
        setGameOverMessage('You Lost');
    }
    setMytime(new_time); // Update state with the new time
    }

function updateOpClockTime(optime,setOptime,id,setGameOver,setGameOverMessage) {

    let new_time = optime.slice(); // Make a copy of the clock_time array
    if (new_time[1] === 0) 
    {
        new_time[0] -= 1;
        new_time[1] = 59;
    } 
    else {
        new_time[1] -= 1;
    }
    if(new_time[0]==0 && new_time[1]==0) 
    {
        GameOverEvent({id,msg:'You Lost'});
        setGameOver(true);
        setGameOverMessage('You Won');
    }
        setOptime(new_time); // Update state with the new time
    }