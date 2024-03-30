import {useEffect} from "react";
import {Move} from "../Functions/MoveLogic";
import {useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil'
import { moves, pawn_cords,king_moves, positions, rook_move, old_positions} from '../Store/Atoms/PositionsAndCordsAtoms'
import {Id, checks, color, promotions, turn} from '../Store/Atoms/UtilityAtoms'

export default function HandleClicks({divRef}) {
  const [position,setPosition] = useRecoilState(positions);
  const [promotion,setPromotion] = useRecoilState(promotions);
  const [move,setMove] = useRecoilState(moves);
  const colors = useRecoilValue(color);
  const [turn_,setTurn] = useRecoilState(turn);
  const [check,setCheck] = useRecoilState(checks);
  const id = useRecoilValue(Id);
  const setPawnCords = useSetRecoilState(pawn_cords);
  const king_move = useRecoilValue(king_moves);
  const rook_moves = useRecoilValue(rook_move);
  const old_position = useRecoilValue(old_positions);
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
        if (!promotion) Move({ row: blockX, column: blockY,position,setPosition,move,setMove,
        colors,turn_,setTurn,check,setCheck,id,setPromotion,setPawnCords,king_move,rook_moves,old_position});
      }
    };

    document.addEventListener("click", useHandleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", useHandleClick);
    };
  }, [divRef, promotion,id,turn_,colors,move]); // Include divRef and promotion in the dependency array

  // Rest of your component logic...
}
