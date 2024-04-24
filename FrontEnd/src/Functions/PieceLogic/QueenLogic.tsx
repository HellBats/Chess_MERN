import { event } from "../../hooks/useUpdatePosition";
import { WhitePieceBoard } from "../Racist";

interface QueenProps
{
    prevPosition:WhitePieceBoard,
    cords:[[number,number],[number,number]],
}


export default function Queen({prevPosition,cords}:QueenProps):event
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    const piece_to_color= (piece_to[0]==piece[0]);
    if((rank==rank_to || file==file_to))
    {
        
        const direction = CalculateStraightDirection({rank,rank_to,file,file_to});//file=>true
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
    if(Math.abs(rank-rank_to)==Math.abs(file-file_to))
    {
        const piece_to_color= (piece_to[0]==piece[0]);
        const [rank_direction,file_direction] = CalculateDiagonalDirection({rank,rank_to,file,file_to});//up=>true,right=>true
        if(rank_direction)
        {
            if(!file_direction)
            {
                for(let i=rank-1,j=file-1;i>rank_to;i--,j--)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return event.None;}
                }
            }
            else
            {
                for(let i=rank-1,j=file+1;i>rank_to;i--,j++)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return event.None;}
                }
            }
        }
        else
        {
            if(!file_direction)
            {
                for(let i=rank+1,j=file-1;i<rank_to;i++,j--)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return event.None;}
                }
            }
            else
            {
                for(let i=rank+1,j=file+1;i<rank_to;i++,j++)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return event.None;}
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

const CalculateStraightDirection = ({rank,rank_to,file,file_to}:DirectionProps)=>
    {
        if(rank==rank_to)
        {
            const direction_file = file -file_to;
            return ([direction_file>0?true:false,true]);
        }
        const direction_rank = rank -rank_to;
        return ([direction_rank>0?true:false,false]);
    }

const CalculateDiagonalDirection = ({rank,rank_to,file,file_to})=>
    {
        if(rank>rank_to)
        {
            if(file>file_to){return[true,false];}
            else{return[true,true];}
        }
        else
        {
            if(file>file_to){return[false,false];}
            else{return[false,true];}
        }
    }