export default function Bishop({prevPosition,piece,piece_to,rank,file,rank_to,file_to})
{
    if(Math.abs(rank-rank_to)==Math.abs(file-file_to))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        const [rank_direction,file_direction] = CalculateDirection({rank,rank_to,file,file_to});
        if(rank_direction=='up')
        {
            if(file_direction=='left')
            {
                for(let i=rank-1,j=file-1;i>rank_to;i--,j--)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return false;}
                }
            }
            else
            {
                for(let i=rank-1,j=file+1;i>rank_to;i--,j++)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return false;}
                }
            }
        }
        if(rank_direction=='down')
        {
            if(file_direction=='left')
            {
                for(let i=rank+1,j=file-1;i<rank_to;i++,j--)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return false;}
                }
            }
            else
            {
                for(let i=rank+1,j=file+1;i<rank_to;i++,j++)
                {
                    if(prevPosition[i-1][j-1][0]!='tr'){return false;}
                }
            }
        }
        if(!piece_to_color)
        {
            return true;
        }
        return false;
    }
    return false;
}


function CalculateDirection({rank,rank_to,file,file_to})
{
    if(rank>rank_to)
    {
        if(file>file_to){return['up','left'];}
        else{return['up','right'];}
    }
    else
    {
        if(file>file_to){return['down','left'];}
        else{return['down','right'];}
    }
}