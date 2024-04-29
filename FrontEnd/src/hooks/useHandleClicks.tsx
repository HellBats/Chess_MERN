import {useEffect} from "react";
import {useRecoilValue, useRecoilState} from 'recoil'
import { moves, positions} from '../Store/Atoms/PositionsAndCordsAtoms'
import {Id, color, promotions, turn} from '../Store/Atoms/UtilityAtoms'

export default function useHandleClicks({divRef}):[[number,number],[number,number]]  {
  const position = useRecoilValue(positions);
  const promotion = useRecoilValue(promotions);
  const [move,setMove] = useRecoilState(moves);
  const colors = useRecoilValue(color);
  const turn_= useRecoilState(turn);
  const id = useRecoilValue(Id);
  let cords:[[number,number],[number,number]] = [[-1,-1],[-1,-1]];
  // This hook detects clicks
  useEffect(() => {
    const useHandleClick = (event) => {
      const rect = divRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const board_length = rect.right - rect.left;

      if (clickX > 0 && clickX < board_length && clickY > 0 && clickY < board_length) {
        const blockX = Math.floor((clickX / board_length) * 8 + 1);
        const blockY = Math.floor((clickY / board_length) * 8 + 1);
        cords = [...move];
        const piece_color = position[blockX-1][blockY-1][0][0]=='w'?true:false;
        const my_turn = (piece_color && colors && turn_) || (!piece_color && !colors && !turn_);
        if(cords[0][0]==-1)
          {
            if((!my_turn)) cords = [[-1,-1],[-1,-1]] ;
            if(position[blockX-1][blockY-1][0]!='tr') setMove([[blockX,blockY],[-1,-1]]);
            else {cords = [[-1,-1],[-1,-1]];}
          }
        if(cords[0][0]!=-1)
          {
            cords[1][0] = blockX;
            cords[1][1] = blockY;
            setMove([[-1,-1],[-1,-1]]);
          }
        }
    };
    document.addEventListener("click", useHandleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", useHandleClick);
    };
  }, [divRef, promotion,id,turn_,colors,move]); // Include divRef and promotion in the dependency array
  return cords;
  // Rest of your component logic...
}
