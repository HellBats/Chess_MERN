export default function Pawn({prevPosition,old_position,piece,piece_to,rank,file,rank_to,file_to,color})
{
    if(file!=file_to && rank_to!=1)
    {
        if(piece_to!='tr')
        {
            let piece_to_color= (piece_to[0]==piece[0]);
            if(rank_to==rank-1 && (file_to==file-1 || file_to==file+1) && !piece_to_color)
            {
                return true;
            }
            return false;
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
                        console.log('enpassant');
                        return 'enpassant';
                    }
                }
            }
            return false;
        }
    }
    if(rank_to==rank-1)
    {
        if(file!=file_to && rank_to==1)
        {
            if(piece_to[0]==color?'b':'w')
            {
                return 'promotion';
            }
        }
        if(rank_to==1)
        {
            if(piece_to=='tr')
            {
                return 'promotion';
            }
        }
        else if(file==file_to)
        {
            if(piece_to=='tr')
            {
                return true;
            }
        }
        return false;
    }
    if(rank==7)
    {
        if(rank_to==rank-1)
        {
            if(piece_to=='tr')
            {
                return true;
            }
            return false;
        }
        else if(rank_to==rank-2)
        {
            if(piece_to=='tr')
            {
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
}