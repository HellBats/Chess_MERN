import Bishop from "./BishopLogic";
import King from "./KingLogic";
import Knight from "./KnightLogic";
import Pawn from "./PawnLogic";
import Queen from "./QueenLogic";
import Rook from "./RookLogic";
//This Function will control all the Logic of pieces
export default function ValidMoves({position:prevPosition,old_position,cords,color,king_move,rook_moves})
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    const piece_color = color?'w':'b'
    if(piece_color!=piece[0]) return false;
    if(piece=='bp' || piece=='wp'){return Pawn({prevPosition,old_position,piece,piece_to,rank,file,rank_to,file_to,color});}
    if(piece=='br' || piece=='wr'){return Rook({prevPosition,piece,piece_to,rank,file,rank_to,file_to});}
    if(piece=='bb' || piece=='wb'){return Bishop({prevPosition,piece,piece_to,rank,file,rank_to,file_to});}
    if(piece=='bq' || piece=='wq'){return Queen({prevPosition,piece,piece_to,rank,file,rank_to,file_to});}
    if(piece=='bn' || piece=='wn'){return Knight({piece,piece_to,rank,file,rank_to,file_to});}
    if(piece=='bk' || piece=='wk'){return King({prevPosition,piece,piece_to,rank,file,
        rank_to,file_to,color,king_move,rook_moves});}
    return false;
}