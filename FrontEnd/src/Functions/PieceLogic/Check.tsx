export default function Check(position,color):boolean
{
    const king = (color?'wk':'bk');
    const [rank,file] = FindKing(position,king);
    if(CheckForPawn({king,position,rank,file}) ||
    CheckForKnight({king,position,rank,file}) ||
    CheckForRook({king,position,rank,file}) ||
    CheckForBishop({king,position,rank,file}) ||
    CheckForQueen({king,position,rank,file}) ||
    CheckForKing({king,position,rank,file})){return true;}
    return false;
}

function FindKing(position,king)
{
    for(let i=0;i<8;i++)
    {
        for(let j=0;j<8;j++)
        {
            if(position[i][j][0] == king){return [i+1,j+1];}
        }
    }
    return [];
}

function CheckForPawn({king,position,rank,file})
{   
    const pawn_color = king=='wk'?'bp':'wp';
    const ranks = [rank-1];
    const files = [file-1,file+1];
    const valid_ranks = ranks.filter(value => (value<8 && value>0));
    const valid_files = files.filter(value=> (value<9 && value>0));
    for(var i in valid_ranks)
    {
        for(var j in valid_files)
        {
            const rankIndex = valid_ranks[i];
            const fileIndex = valid_files[j];

            if (position[rankIndex - 1][fileIndex - 1][0] == pawn_color) {
                return true;
            }
        }
    }
    return false;
}

function CheckForKnight({king,position,rank,file})
{
    const knight_color = king=='wk'?'bn':'wn';
    const ranks1 = [rank-1,rank+1];
    const files1 = [file-1,file+1];
    const ranks2 = [rank-2,rank+2];
    const files2 = [file+2,file-2];
    const valid_ranks1 = ranks1.filter(value => (value<9 && value>0));
    const valid_files1 = files1.filter(value=> (value<9 && value>0));
    const valid_ranks2 = ranks2.filter(value => (value<9 && value>0));
    const valid_files2 = files2.filter(value=> (value<9 && value>0));
    // console.log(valid_ranks1,valid_ranks2,valid_files1,valid_files2);
    for(let i in valid_ranks1)
    {
        for(let j in valid_files2)
        {
            const rankIndex = valid_ranks1[i];
            const fileIndex = valid_files2[j];
    
            if (position[rankIndex - 1][fileIndex - 1][0] == knight_color) {
                return true;
            }
        }
    }
    for(let i in valid_ranks2)
    {
        for(let j in valid_files1)
        {
            const rankIndex = valid_ranks2[i];
            const fileIndex = valid_files1[j];
    
            if (position[rankIndex - 1][fileIndex - 1][0] == knight_color) {
                return true;
            }
        }
    }
    return false;
}

function CheckForRook({king,position,rank,file})
{
    const rook_color = king=='wk'?'br':'wr';
    for(let i = rank;i<8;i++)
    {
        if(position[i][file-1][0]==rook_color){return true;}
        if(position[i][file-1][0]!='tr'){break;}
    }
    for(let i = rank-2;i>=0;i--)
    {
        if(position[i][file-1][0]==rook_color){return true;}
        if(position[i][file-1][0]!='tr'){break;}
    }
    for(let j= file;j<8;j++)
    {
        if(position[rank-1][j][0]==rook_color){return true;}
        if(position[rank-1][j][0]!='tr'){break;}
    }
    for(let j= file-2;j>=0;j--)
    {
        if(position[rank-1][j][0]==rook_color){return true;}
        if(position[rank-1][j][0]!='tr'){break;}
    }
    return false;
}

function CheckForBishop({king,position,rank,file})
{
    const bishop_color = king=='wk'?'bb':'wb';
    for(let i = rank,j=file;i<8 && j<8;i++,j++)
    {
        if(position[i][j][0]==bishop_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank,j=file-2;i<8 && j>=0;i++,j--)
    {
        if(position[i][j][0]==bishop_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank-2,j=file;i>=0 && j<8;i--,j++)
    {
        if(position[i][j][0]==bishop_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank-2,j=file-2;i>=0 && j>=0;i--,j--)
    {
        if(position[i][j][0]==bishop_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    return false;
}

function CheckForQueen({king,position,rank,file})
{
    const queen_color = king=='wk'?'bq':'wq';
    for(let i = rank;i<8;i++)
    {
        if(position[i][file-1][0]==queen_color){return true;}
        if(position[i][file-1][0]!='tr'){break;}
    }
    for(let i = rank-2;i>=0;i--)
    {
        if(position[i][file-1][0]==queen_color){return true;}
        if(position[i][file-1][0]!='tr'){break;}
    }
    for(let j= file;j<8;j++)
    {
        if(position[rank-1][j][0]==queen_color){return true;}
        if(position[rank-1][j][0]!='tr'){break;}
    }
    for(let j= file-2;j>=0;j--)
    {
        if(position[rank-1][j][0]==queen_color){return true;}
        if(position[rank-1][j][0]!='tr'){break;}
    }
    for(let i = rank,j=file;i<8 && j<8;i++,j++)
    {
        if(position[i][j][0]==queen_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank,j=file-2;i<8 && j>=0;i++,j--)
    {
        if(position[i][j][0]==queen_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank-2,j=file;i>=0 && j<8;i--,j++)
    {
        if(position[i][j][0]==queen_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    for(let i = rank-2,j=file-2;i>=0 && j>=0;i--,j--)
    {
        if(position[i][j][0]==queen_color){return true;}
        if(position[i][j][0]!='tr'){break;}
    }
    return false;
}

function CheckForKing({king,position,rank,file})
{   
    const king_color = king=='wk'?'bk':'wk';
    const ranks = [rank-1,rank+1,rank];
    const files = [file-1,file+1,file];
    const valid_ranks = ranks.filter(value => (value<9 && value>0));
    const valid_files = files.filter(value=> (value<9 && value>0));
    for(let i in valid_ranks)
    {
        for(let j in valid_files)
        {
            const rankIndex = valid_ranks[i];
            const fileIndex = valid_files[j];
    
            if (position[rankIndex - 1][fileIndex - 1][0] == king_color) {
                return true;
            }
        }
    }
    return false;
}