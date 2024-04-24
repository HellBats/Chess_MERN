import { useEffect } from "react";
import Check from "./PieceLogic/Check";
import CheckMate from "./CheckMate";
import { useRecoilState, useRecoilValue} from "recoil";
import {Id, checks} from "../Store/Atoms/UtilityAtoms"
import { board_mounts,color } from "../Store/Atoms/UtilityAtoms";
import { positions } from "../Store/Atoms/PositionsAndCordsAtoms";
import { GameOverEvent } from "../hooks/SocketConnection";


export function GameConditions({setGameOver,setGameOverMessage})
{
  const position = useRecoilValue(positions);
  const [check,setCheck] = useRecoilState(checks);
  const board_mount = useRecoilValue(board_mounts);
  const colors = useRecoilValue(color);
  const id = useRecoilValue(Id);
    useEffect(()=>
    {
      console.log(board_mount);
        const check_ = Check(position,colors)
        const mate = CheckMate({position,color:colors});
        if(check_ && board_mount>4)
        {
          if(!mate)//mate tells if there is a possible move left to avoid check
          {
            console.log('GameOver');
            setGameOverMessage('you Lost');
            setGameOver(true);
            GameOverEvent({id,msg:'You Won'});
          }
        }
        else if(!mate && board_mount>4)
        {
          setGameOverMessage('Draw by stalemate');
          setGameOver(true);
          GameOverEvent({id,msg:'Draw by stalemate'});
        }
        setCheck(check_);
    },[check,position])
}