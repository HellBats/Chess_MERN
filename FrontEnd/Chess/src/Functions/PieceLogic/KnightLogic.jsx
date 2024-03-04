export default function Knight({piece,piece_to,rank,file,rank_to,file_to})
{
    if((Math.abs(rank-rank_to)==1 && Math.abs(file-file_to)==2) || (Math.abs(rank-rank_to)==2 && Math.abs(file-file_to)==1))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return true;
        }
        return false;
    }
    return false;
}