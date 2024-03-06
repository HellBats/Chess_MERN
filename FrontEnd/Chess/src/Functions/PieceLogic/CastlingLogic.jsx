function KingMoved(which_king,king_move)
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

function CheckForCastle({position,cords,color,setKing_move})
{
    const piece = position[cords[0][0]-1][cords[0][1]-1];
  const king_color = piece[0]=='wk'?true:false;
  const king_rank = ((!color && king_color) || (color && !king_color))?1:8;
  if(piece[0]=='wk' && (king_rank!=piece[1] || piece[2]!=5))
  {
    setKing_move(prev=>
      {
        const new_king_move = prev;
        new_king_move[0] = true;
        return new_king_move;
      })
  }
  else if(piece[0]=='bk' && (king_rank!=piece[1] || piece[2]!=5))
  {
    setKing_move(prev=>
      {
        const new_king_move = prev;
        new_king_move[1] = true;
        return new_king_move;
      })
  }
}

export {CheckForCastle,KingMoved}