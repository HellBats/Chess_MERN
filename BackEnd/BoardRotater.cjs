function Rotate({position})
{
    for(let i=0;i<4;i++)
    {   
        for(let j=0;j<8;j++)
        {
            [position[i][j][0],position[7-i][j][0]] = [position[7-i][j][0],position[i][j][0]];
        }
    }
    return position;
}




module.exports = {Rotate}