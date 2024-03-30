import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { board_mounts, highlight_move } from "../Store/Atoms/UtilityAtoms";
import { old_positions,previous_positions} from "../Store/Atoms/PositionsAndCordsAtoms";
import { positions } from "../Store/Atoms/PositionsAndCordsAtoms";

export default function HighlightUpdate({move_audio})
{
  const position = useRecoilValue(positions);
  const [board_mount,setBoardMounts] = useRecoilState(board_mounts);
  const setOldPosition = useSetRecoilState(old_positions);
  const [previous_position,setPreviousPosition] = useRecoilState(previous_positions);
  const setHighlight = useSetRecoilState(highlight_move);
  
  useEffect(()=>
  {
    if(board_mount==2)
    {
      setPreviousPosition(position);
    }
    if(board_mount==3)
    {
      setOldPosition(previous_position);
    }
    if(board_mount>2)
    {
      const play = ()=>{
        move_audio();
      }
      play();
      HighlightBox({position,previous_position,setPreviousPosition,setOldPosition,setHighlight});
    }
    setBoardMounts(prev=>prev+1);
  },[position]);
}

function HighlightBox({position,previous_position,setPreviousPosition,setOldPosition,setHighlight})
{
  let counter = 0;
  setHighlight(()=>
    {
      let high = [];
    for(let i=0;i<8 && counter<2;i++)
    {
      for(let j=0;j<8 && counter<2;j++)
      {
        if(position[i][j][0] != previous_position[i][j][0])
        {
          high.push([[i+1],[j+1]]);
          counter++;
        }
      }
    }
    return high;
  });
  setPreviousPosition(position);
  setOldPosition(previous_position);
}