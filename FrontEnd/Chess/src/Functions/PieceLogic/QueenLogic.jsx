export default function Queen({prevPosition,piece,piece_to,rank,file,rank_to,file_to})
{
    if((rank==rank_to || file==file_to))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        
        const [direction,rf] = CalculateStraightDirection({rank,rank_to,file,file_to});
        if(rf=='file')
        {
            if(direction)
            {
                for(let i = file -1;i>file_to;i--)
                {
                    if(prevPosition[rank-1][i-1][0]!='tr')
                    {
                        return false;
                    }
                }
            }
            else
            {
                for(let i = file+1;i<file_to;i++)
                {
                    if(prevPosition[rank-1][i-1][0]!='tr')
                    {
                        return false;
                    }
                }
            }
        }
        if(rf=='rank')
        {
            if(direction)
            {
                for(let i = rank -1;i>rank_to;i--)
                {
                    if(prevPosition[i-1][file-1][0]!='tr')
                    {
                        return false;
                    }
                }
            }
            else
            {
                for(let i = rank+1;i<rank_to;i++)
                {
                    if(prevPosition[i-1][file-1][0]!='tr')
                    {
                        return false;
                    }
                }
            }

        }
        if(!piece_to_color)
        {
            return true;
        }
        return false;
    }
    if(Math.abs(rank-rank_to)==Math.abs(file-file_to))
    {
        let piece_to_color= (piece_to[0]==piece[0]);
        const [rank_direction,file_direction] = CalculateDiagonalDirection({rank,rank_to,file,file_to});
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

function CalculateStraightDirection({rank,rank_to,file,file_to})
{
    if(rank==rank_to)
    {
        let direction_file = file -file_to;
        return ([direction_file>0?true:false,'file']);
    }
    if(file==file_to)
    {
        let direction_rank = rank -rank_to;
        return ([direction_rank>0?true:false,'rank']);
    }
}

function CalculateDiagonalDirection({rank,rank_to,file,file_to})
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