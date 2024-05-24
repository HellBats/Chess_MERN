import {useEffect} from "react";
import {useRecoilValue, useRecoilState} from 'recoil'
import { moves, positions} from '../Store/Atoms/PositionsAndCordsAtoms'
import {Id, color, promotions, turn} from '../Store/Atoms/UtilityAtoms'

export default function useHandleClicks({divRef}:any) {
  const position = useRecoilValue(positions);
  const promotion = useRecoilValue(promotions);
  const [move,setMove] = useRecoilState(moves);
  const colors = useRecoilValue(color);
  const turn_= useRecoilValue(turn);
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
        cords = [move[0],move[1]];
        const piece_color = position[blockY-1][blockX-1][0][0]=='w'?true:false;
        const my_turn = (piece_color && colors && turn_) || (!piece_color && !colors && !turn_);
        console.log(my_turn);
        if(cords[0][0]==-1)
          {
            if(my_turn){
              if(position[blockY-1][blockX-1][0]!='tr') setMove([[blockY,blockX],[-1,-1]]);
            }
          }
        else
          {
            console.log([move[0],[blockY,blockX]]);
            setMove([move[0],[blockY,blockX]]);
          }
        }
    };
    document.addEventListener("click", useHandleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", useHandleClick);
    };
  }, [divRef, promotion,id,turn_,colors,move,position]); // Include divRef and promotion in the dependency array
  // Rest of your component logic...
}
