import {event} from '../../hooks/useUpdatePosition'
import { WhitePieceBoard } from '../Racist';

interface PawnProps
{
    prevPosition:WhitePieceBoard,
    old_position:WhitePieceBoard,
    cords:[[number,number],[number,number]],
    color:boolean
}
export default function Pawn({prevPosition,old_position,cords,color}:PawnProps):event
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    if(file!=file_to && rank_to!=1)
    {
        if(piece_to!='tr')
        {
            const piece_to_color= (piece_to[0]==piece[0]);
            if(rank_to==rank-1 && (file_to==file-1 || file_to==file+1) && !piece_to_color)
            {
                return event.Capture;
            }
            return event.None;
        }
        else
        {
            if(rank == 4 && rank_to==3)
            {
                console.log(prevPosition[rank-1][file_to-1][0],((color?'b':'w')+'p'));
                if(prevPosition[rank-1][file_to-1][0]==((color?'b':'w')+'p'))
                {
                    console.log(old_position[1][file_to-1]);
                    if(old_position[1][file_to-1][0]==(color?'b':'w')+'p')
                    {
                        return event.Enpassant;
                    }
                }
            }
            return event.None;
        }
    }
    if(rank_to==rank-1)
    {
        if(file!=file_to && rank_to==1)
        {
            if(piece_to[0]==color?'b':'w')
            {
                return event.Promotion;
            }
        }
        if(rank_to==1)
        {
            if(piece_to=='tr')
            {
                return event.Promotion;
            }
        }
        else if(file==file_to)
        {
            if(piece_to=='tr')
            {
                return event.NormalMove;
            }
        }
        return event.None;
    }
    if(rank==7)
    {
        if(rank_to==rank-1)
        {
            if(piece_to=='tr')
            {
                return event.NormalMove;
            }
            return event.None;
        }
        else if(rank_to==rank-2)
        {
            if(piece_to=='tr')
            {
                return event.NormalMove;
            }
            return event.None;
        }
        return event.None;
    }
    return event.None;
}