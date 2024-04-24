import { event } from "../../hooks/useUpdatePosition";
import { WhitePieceBoard } from '../Racist';

interface RookProps
{
    prevPosition:WhitePieceBoard,
    cords:[[number,number],[number,number]],
}

interface DirectionProps
{
    rank:number,
    rank_to:number,
    file:number,
    file_to:number
}
export default function Rook({prevPosition,cords}:RookProps):event
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    if((rank==rank_to || file==file_to))
    {
        const piece_to_color= (piece_to[0]==piece[0]);
        
        const direction = CalculateDirection({rank,rank_to,file,file_to});//file=>true
        if(direction[1])
        {
            if(direction)
            {
                for(let i = file -1;i>file_to;i--)
                {
                    if(prevPosition[rank-1][i-1][0]!='tr')
                    {
                        return event.None;
                    }
                }
            }
            else
            {
                for(let i = file+1;i<file_to;i++)
                {
                    if(prevPosition[rank-1][i-1][0]!='tr')
                    {
                        return event.None;
                    }
                }
            }
        }
        else
        {
            if(direction)
            {
                for(let i = rank -1;i>rank_to;i--)
                {
                    if(prevPosition[i-1][file-1][0]!='tr')
                    {
                        return event.None;
                    }
                }
            }
            else
            {
                for(let i = rank+1;i<rank_to;i++)
                {
                    if(prevPosition[i-1][file-1][0]!='tr')
                    {
                        return event.None;
                    }
                }
            }

        }
        if(!piece_to_color)
        {
            return event.NormalMove;
        }
        return event.None;
    }
    return event.None;
}

const CalculateDirection = ({rank,rank_to,file,file_to}:DirectionProps)=>
{
    if(rank==rank_to)
    {
        const direction_file = file -file_to;
        return ([direction_file>0?true:false,true]);
    }
    const direction_rank = rank -rank_to;
    return ([direction_rank>0?true:false,false]);
}