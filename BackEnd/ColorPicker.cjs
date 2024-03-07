function Color(color)
{
    let position = [];
    if(color)
    {
      position = 
          [
            [['br',1,1], ['bn',1,2], ['bb',1,3], ['bq',1,4], ['bk',1,5], ['bb',1,6], ['bn',1,7], ['br',1,8]],
            [['bp',2,1], ['bp',2,2], ['bp',2,3], ['bp',2,4], ['bp',2,5], ['bp',2,6], ['bp',2,7], ['bp',2,8]],
            [['tr',3,1], ['tr',3,2], ['tr',3,3], ['tr',3,4], ['tr',3,5], ['tr',3,6], ['tr',3,7], ['tr',3,8]],
            [['tr',4,1], ['tr',4,2], ['tr',4,3], ['tr',4,4], ['tr',4,5], ['tr',4,6], ['tr',4,7], ['tr',4,8]],
            [['tr',5,1], ['tr',5,2], ['tr',5,3], ['tr',5,4], ['tr',5,5], ['tr',5,6], ['tr',5,7], ['tr',5,8]],
            [['tr',6,1], ['tr',6,2], ['tr',6,3], ['tr',6,4], ['tr',6,5], ['tr',6,6], ['tr',6,7], ['tr',6,8]],
            [['wp',7,1], ['wp',7,2], ['wp',7,3], ['wp',7,4], ['wp',7,5], ['wp',7,6], ['wp',7,7], ['wp',7,8]],
            [['wr',8,1], ['wn',8,2], ['wb',8,3], ['wq',8,4], ['wk',8,5], ['wb',8,6], ['wn',8,7], ['wr',8,8]]
          ]
    }
    else
    {
      position = 
          [
            [['wr',1,1], ['wn',1,2], ['wb',1,3], ['wq',1,4], ['wk',1,5], ['wb',1,6], ['wn',1,7], ['wr',1,8]],
            [['wp',2,1], ['wp',2,2], ['wp',2,3], ['wp',2,4], ['wp',2,5], ['wp',2,6], ['wp',2,7], ['wp',2,8]],
            [['tr',3,1], ['tr',3,2], ['tr',3,3], ['tr',3,4], ['tr',3,5], ['tr',3,6], ['tr',3,7], ['tr',3,8]],
            [['tr',4,1], ['tr',4,2], ['tr',4,3], ['tr',4,4], ['tr',4,5], ['tr',4,6], ['tr',4,7], ['tr',4,8]],
            [['tr',5,1], ['tr',5,2], ['tr',5,3], ['tr',5,4], ['tr',5,5], ['tr',5,6], ['tr',5,7], ['tr',5,8]],
            [['tr',6,1], ['tr',6,2], ['tr',6,3], ['tr',6,4], ['tr',6,5], ['tr',6,6], ['tr',6,7], ['tr',6,8]],
            [['bp',7,1], ['bp',7,2], ['bp',7,3], ['bp',7,4], ['bp',7,5], ['bp',7,6], ['bp',7,7], ['bp',7,8]],
            [['br',8,1], ['bn',8,2], ['bb',8,3], ['bq',8,4], ['bk',8,5], ['bb',8,6], ['bn',8,7], ['br',8,8]]
          ]
    }
    return position;
}
module.exports = {Color};