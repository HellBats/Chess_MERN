import {useEffect} from 'react'
function CastleMoved(which_king,king_move)
{
  if(which_king=='wk')
  {
    if(king_move[0])
    {
      return false
    }
    return true;
  }
  else if(which_king=='bk')
  {
    if(king_move[1])
    {
      return false
    }
    return true
  }
  else
  {
    return false;
  }
}


function KingsAndRooks({position,king_move,setKing_move,setRook_move,color})
{
  useEffect(()=>{
    const white_king_rank = color?8:1;
    const black_king_rank = color?1:8;

    const white_rook_rank = color?8:1;
    const black_rook_rank = color?1:8;
    const white_rook_left_file =  color?1:8;
    const white_rook_right_file =  color?8:1;
    const black_rook_left_file =  color?8:1;
    const black_rook_right_file =  color?1:8;
    if(king_move[2]<2)
    {
      setKing_move(prev=>{return [false,false,prev[2]+1]});
      return;
    }
      if(position[white_king_rank-1][4][0] != 'wk')
      {
        setKing_move(prev=>
          {
            const new_king_move = prev;
            new_king_move[0] = true;
            return new_king_move;
          })
      }
      if(position[black_king_rank-1][3][0] != 'bk')
      {
        setKing_move(prev=>
          {
            const new_king_move = prev;
            new_king_move[1] = true;
            return new_king_move;
          })
      }
      if(position[white_rook_rank-1][white_rook_left_file-1][0] != 'wr'){
        setRook_move(prev=>{
          prev[0][0] = true;
          return prev;

        });
      }
      if(position[white_rook_rank-1][white_rook_right_file-1][0] != 'wr'){
        setRook_move(prev=>{
          prev[0][1] = true;
          return prev;
        });
      }
      if(position[black_rook_rank-1][black_rook_left_file-1][0] != 'br'){
        setRook_move(prev=>{
          prev[1][0] = true;
          return prev;
        });
      }
      if(position[black_rook_rank-1][black_rook_right_file-1][0] != 'br'){
        setRook_move(prev=>{
          prev[1][1] = true;
          return prev;
        });
      }
  },[position,color]);
}

export {CastleMoved,KingsAndRooks}