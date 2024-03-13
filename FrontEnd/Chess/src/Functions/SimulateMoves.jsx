import Check from "./PieceLogic/Check";

export function PawnMoves({position,rank,file,color})
{
    let possible_ranks = [rank+1];
    let possible_files = [file,file+1,file-1];

    possible_files = possible_files.filter(file=>{file>0&&file<9});
    possible_ranks = possible_ranks.filter(rank=>{rank>0&&rank<9});
    for(let i of possible_ranks)
    {
        for(let j of possible_files)
        {
            if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
            let new_position = JSON.parse(JSON.stringify(position));
            new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
            new_position[rank-1][file- 1][0] = 'tr';
            if(Check(new_position,color))
            {
                continue;
            }
            else
            {
                return true;
            }
        }
    }
    return false;
}

export function KnightMoves({position,rank,file,color})
{
    const ranks1 = [rank-1,rank+1];
    const files1 = [file-1,file+1];
    const ranks2 = [rank-2,rank+2];
    const files2 = [file+2,file-2];
    const valid_ranks1 = ranks1.filter(value => (value<9 && value>0));
    const valid_files1 = files1.filter(value=> (value<9 && value>0));
    const valid_ranks2 = ranks2.filter(value => (value<9 && value>0));
    const valid_files2 = files2.filter(value=> (value<9 && value>0));
    // console.log(valid_ranks1,valid_ranks2,valid_files1,valid_files2);
    for(let i of valid_ranks1)
    {
        for(let j of valid_files2)
        {    
            let new_position = JSON.parse(JSON.stringify(position));
            new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
            new_position[rank-1][file- 1][0] = 'tr';
            if(Check(new_position,color))
            {
                continue;
            }
            else
            {
                return true;
            }
        }
    }
    for(let i of valid_ranks2)
    {
        for(let j of valid_files1)
        {
            let new_position = JSON.parse(JSON.stringify(position));
            new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
            new_position[rank-1][file- 1][0] = 'tr';
            if(Check(new_position,color))
            {
                continue;
            }
            else
            {
                return true;
            }
        }
    }
    return false;
}

export function RookMoves({position,rank,file,color})
{
    for(let i = rank+1;i<9;i++)
    {
        if(position[i-1][file-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][file- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    for(let i = rank-1;i>0;i--)
    {
        if(position[i-1][file-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][file- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    for(let j= file+1;j<9;j++)
    {
        if(position[rank-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[rank- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    for(let j= file-1;j>0;j--)
    {
        if(position[rank-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[rank- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    return false;
}

export function BishopMoves({position,rank,file,color})
{
    for(let i = rank+1,j=file+1;i<9 && j<9;i++,j++)
    {
        if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    for(let i = rank+1,j=file-1;i<9 && j>0;i++,j--)
    {
        if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }        
    }
    for(let i = rank-1,j=file+1;i>0 && j<9;i--,j++)
    {
        if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    for(let i = rank-1,j=file-1;i>0 && j>0;i--,j--)
    {
        if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
        let new_position = JSON.parse(JSON.stringify(position));
        new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
        new_position[rank-1][file- 1][0] = 'tr';
        if(Check(new_position,color))
        {
            continue;
        }
        else
        {
            return true;
        }
    }
    return false;
}

export function QueenMoves({position,rank,file,color})
{
    if(RookMoves({position,rank,file,color}) || BishopMoves({position,rank,file,color}))
    {
        return true;
    }
    return false;
}

export function KingMoves({position,rank,file,color})
{
    const ranks = [rank-1,rank+1,rank];
    const files = [file-1,file+1,file];
    const valid_ranks = ranks.filter(value => (value<9 && value>0));
    const valid_files = files.filter(value=> (value<9 && value>0));
    for(let i of valid_ranks)
    {
        for(let j of valid_files)
        {
            if(position[i-1][j-1][0][0]==(color?'w':'b')){break;}
            let new_position = JSON.parse(JSON.stringify(position));
            new_position[i- 1][j- 1][0] = new_position[rank - 1][file - 1][0];
            new_position[rank-1][file- 1][0] = 'tr';
            if(Check(new_position,color))
            {
                continue;
            }
            else
            {
                console.log(i,j);
                return true;
            }
        }
    }
    return false;
}