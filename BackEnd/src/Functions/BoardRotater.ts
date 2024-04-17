export function Rotate(position:any)
{
    for(let i=0;i<4;i++)
    {   
        for(let j=0;j<8;j++)
        {
            [position[i][j][0],position[7-i][7-j][0]] = [position[7-i][7-j][0],position[i][j][0]];
        }
    }
    return position;
}