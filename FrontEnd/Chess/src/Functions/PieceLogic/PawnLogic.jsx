export default function Pawn({piece,piece_to,rank,file,rank_to,file_to,color})
{
    const piece_color = piece=='wp'?true:false;
    color = (!piece_color && color) || (piece_color && !color);
    if(file!=file_to)
    {
        if(piece_to!='tr')
        {
            let piece_to_color= (piece_to[0]==piece[0]);
            if(rank_to==rank+(color?1:-1) && (file_to==file-1 || file_to==file+1) && !piece_to_color)
            {
                return true;
            }
            return false;
        }
        return false;
    }
    if(rank==7 || rank==2)
    {
        if(rank_to==rank+(color?1:-1))
        {
            if(piece_to=='tr')
            {
                return true;
            }
            return false;
        }
        else if(rank_to==rank+(color?2:-2))
        {
            if(piece_to=='tr')
            {
                return true;
            }
            return false;
        }
        return false;
    }
    if(rank_to==rank+(color?1:-1))
    {
        if(piece_to=='tr')
        {
            return true;
        }
        return false;
    }
    return false;
}