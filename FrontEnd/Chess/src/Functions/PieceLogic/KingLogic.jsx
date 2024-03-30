

export default function King({prevPosition,piece,piece_to,rank,file,rank_to,file_to,color,rook_moves,king_move})
{
    if((Math.abs(rank-rank_to)==1) && (Math.abs(file-file_to)==1))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return true;
        }
        return false;
    }
    if((Math.abs(rank-rank_to)==1 && file==file_to) || (Math.abs(file-file_to)==1 && rank==rank_to))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        if(!piece_to_color)
        {
            return true;
        }
        return false;
    }
    if(rank==8 && rank_to==8)
    {
        if(file_to==7 || file_to==2)
        {
            if(prevPosition[7][file_to-(file_to==7?0:2)][0]==((piece[0]=='w'?'w':'b')+'r'))
            {
                if(file_to==2)
                {
                    if(rook_moves[color?0:1][0] || king_move[color?0:1]){return false;}
                    for(let i=file_to;i<file;i++)
                    {
                        if(prevPosition[rank-1][i-1][0]!='tr'){return false;}
                    }
                }
                else if(file_to==7)
                {
                    if(rook_moves[color?0:1][1] || king_move[color?0:1]){return false;}
                    for(let i=file+1;i<=file_to;i++)
                    {
                        if(prevPosition[rank-1][i-1][0]!='tr'){return false;}
                    }
                }
                return 'castle';
            }
        }
        return false
    }
    return false;
}