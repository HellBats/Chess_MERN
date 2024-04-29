import {event }from '../../hooks/useUpdatePosition'
import { WhitePieceBoard } from '../Racist';
import Bishop from './BishopLogic';
import King from './KingLogic';
import Knight from './KnightLogic';
import Pawn from './PawnLogic';
import Queen from './QueenLogic';
import Rook from './RookLogic';
interface ValidMovesProps
{
  position:WhitePieceBoard,
  old_position:WhitePieceBoard,
  cords:[[number,number],[number,number]],
  colors:boolean,
  king_move:boolean,
  rook_moves:[boolean,boolean]
}
export default function ValidMoves({position:prevPosition,old_position,cords,colors:color,king_move,rook_moves}:ValidMovesProps):event {
      const [rank,file] = [cords[0][0],cords[0][1]];
      const [rank_to,file_to] = [cords[1][0],cords[1][1]];
      const piece = prevPosition[rank-1][file-1][0];
      const piece_to = prevPosition[rank_to-1][file_to-1][0];
      const piece_color = color?'w':'b';
        if(piece_color!=piece[0]) return event.None;
        if(piece=='bp' || piece=='wp'){return Pawn({prevPosition,old_position,cords,color});}
        if(piece=='br' || piece=='wr'){return Rook({prevPosition,cords});}
        if(piece=='bb' || piece=='wb'){return Bishop({prevPosition,cords});}
        if(piece=='bq' || piece=='wq'){return Queen({prevPosition,cords});}
        if(piece=='bn' || piece=='wn'){return Knight({piece,piece_to,cords});}
        if(piece=='bk' || piece=='wk'){return King({prevPosition,cords,color,king_move,rook_moves});}
        return event.None;
    }