import Bishop from "./BishopLogic";
import Pawn from "./PawnLogic";
import Rook from "./RookLogic";
//This Function will control all the Logic of pieces
export default function ValidMoves({prevPosition,cords,color})
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    if(piece=='bp' || piece=='wp')
    {
        return Pawn({piece,piece_to,rank,file,rank_to,file_to,color});
    }
    if(piece=='br' || piece=='wr')
    {
        return Rook({prevPosition,piece,piece_to,rank,file,rank_to,file_to});
    }
    if(piece=='bb' || piece=='wb')
    {
        return Bishop({prevPosition,piece,piece_to,rank,file,rank_to,file_to});
    }
    return false;
}