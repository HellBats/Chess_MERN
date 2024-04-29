import { event } from "../../hooks/useUpdatePosition";
import { WhitePieceBoard } from "../Racist";


interface KingProps
{
    prevPosition:WhitePieceBoard,
    cords:[[number,number],[number,number]],
    color:boolean,
    rook_moves:[boolean,boolean],
    king_move:boolean
}

export default function King({prevPosition,cords,rook_moves,king_move}:KingProps):event
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    if((Math.abs(rank-rank_to)==1) && (Math.abs(file-file_to)==1))
    {
        const piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return event.NormalMove;
        }
        return event.None;
    }
    if((Math.abs(rank-rank_to)==1 && file==file_to) || (Math.abs(file-file_to)==1 && rank==rank_to))
    {
        const piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return event.NormalMove;
        }
        return event.None;
    }
    if(rank==8 && rank_to==8)
    {
        if(file_to==7 || file_to==2)
        {
            if(prevPosition[7][file_to-(file_to==7?0:2)][0]==((piece[0]=='w'?'w':'b')+'r'))
            {
                if(file_to==2)
                {
                    if(rook_moves[0] || king_move){return event.None;}
                    for(let i=file_to;i<file;i++)
                    {
                        if(prevPosition[rank-1][i-1][0]!='tr'){return event.None;}
                    }
                }
                else if(file_to==7)
                {
                    if(rook_moves[1] || king_move){return event.None;}
                    for(let i=file+1;i<=file_to;i++)
                    {
                        if(prevPosition[rank-1][i-1][0]!='tr'){return event.None;}
                    }
                }
                return event.Castling;
            }
        }
        return event.None;
    }
    return event.None;
}