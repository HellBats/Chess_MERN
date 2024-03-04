export default function King({prevPosition,piece,piece_to,rank,file,rank_to,file_to,color})
{
    let piece_color = piece[0]=='w'?true:false;
    const exchange = (color && piece_color) || (!color && !piece_color); 
    let original_rank = exchange?8:1;
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
    if(rank==original_rank && rank_to==original_rank && file==5)
    {
        if(file_to==7 || file_to==2)
        {
            if(prevPosition[rank_to-1][file_to-(file_to==7?0:2)][0]==((piece[0]=='w'?'w':'b')+'r'))
            {
                if(file_to==2)
                {
                    for(let i=file_to;i<file;i++)
                    {
                        if(prevPosition[rank-1][i-1][0]!='tr'){return false;}
                    }
                }
                else if(file_to==7)
                {
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