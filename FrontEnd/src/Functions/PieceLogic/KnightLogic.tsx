import { event } from "../../hooks/useUpdatePosition";

interface KnightProps
{
    piece:string,
    piece_to:string,
    cords:[[number,number],[number,number]]
}

export default function Knight({piece,piece_to,cords}:KnightProps):event
{
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    if((Math.abs(rank-rank_to)==1 && Math.abs(file-file_to)==2) || (Math.abs(rank-rank_to)==2 && Math.abs(file-file_to)==1))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return event.NormalMove;
        }
        return event.None;
    }
    return event.None;
}