import {useEffect} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { king_moves, rook_move } from '../../Store/Atoms/PositionsAndCordsAtoms';
import { color } from '../../Store/Atoms/UtilityAtoms';
import { positions } from "../../Store/Atoms/PositionsAndCordsAtoms";

function CastleMoved(which_king,king_move):boolean
{
  
  if(which_king=='wk')
  {
    if(king_move[0]) return false;
    return true;
  }
  else if(which_king=='bk')
  {
    if(king_move[1]) return false;
    return true
  }
  else return false;
}


function KingsAndRooks()
{
  const position = useRecoilValue(positions);
  const [king_move,setKing_move] = useRecoilState(king_moves);
  const setRook_move = useSetRecoilState(rook_move);
  const colors = useRecoilValue(color);

  useEffect(()=>{
    const white_king_rank = colors?8:1;
    const black_king_rank = colors?1:8;

    const white_rook_rank = colors?8:1;
    const black_rook_rank = colors?1:8;
    const white_rook_left_file =  colors?1:8;
    const white_rook_right_file =  colors?8:1;
    const black_rook_left_file =  colors?8:1;
    const black_rook_right_file =  colors?1:8;
    if(king_move[2]<2)
    {
      setKing_move(prev=>{return [false,false,prev[2]+1]});
      return;
    }
      if(position[white_king_rank-1][4][0] != 'wk')
      {
        setKing_move(prev=>
          {
            const new_king_move = [...prev];
            new_king_move[0] = true;
            return new_king_move;
          })
      }
      if(position[black_king_rank-1][3][0] != 'bk')
      {
        setKing_move(prev=>
          {
            const new_king_move = [...prev];
            new_king_move[1] = true;
            return new_king_move;
          })
      }
      if(position[white_rook_rank-1][white_rook_left_file-1][0] != 'wr'){
        setRook_move(prev=>{
          const new_rook_move = JSON.parse(JSON.stringify(prev)); 
          new_rook_move[0][0] = true;
          return new_rook_move;

        });
      }
      if(position[white_rook_rank-1][white_rook_right_file-1][0] != 'wr'){
        setRook_move(prev=>{
          const new_rook_move = JSON.parse(JSON.stringify(prev));
          new_rook_move[0][1] = true;
          return new_rook_move;
        });
      }
      if(position[black_rook_rank-1][black_rook_left_file-1][0] != 'br'){
        setRook_move(prev=>{
          const new_rook_move = JSON.parse(JSON.stringify(prev));
          new_rook_move[1][0] = true;
          return new_rook_move;
        });
      }
      if(position[black_rook_rank-1][black_rook_right_file-1][0] != 'br'){
        setRook_move(prev=>{
          const new_rook_move = JSON.parse(JSON.stringify(prev));
          new_rook_move[1][1] = true;
          return new_rook_move;
        });
      }
  },[position,colors]);
}

export {CastleMoved,KingsAndRooks}