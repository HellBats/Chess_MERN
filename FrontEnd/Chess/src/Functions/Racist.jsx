import { useState } from "react";


function White()
{
    const [position,setPosition] = useState(
        [
          [['tr',1,1], ['tr',1,2], ['tr',1,3], ['tr',1,4], ['tr',1,5], ['tr',1,6], ['tr',1,7], ['tr',1,8]],
          [['tr',2,1], ['tr',2,2], ['tr',2,3], ['tr',2,4], ['tr',2,5], ['tr',2,6], ['tr',2,7], ['tr',2,8]],
          [['tr',3,1], ['tr',3,2], ['tr',3,3], ['tr',3,4], ['tr',3,5], ['tr',3,6], ['tr',3,7], ['tr',3,8]],
          [['tr',4,1], ['tr',4,2], ['tr',4,3], ['tr',4,4], ['tr',4,5], ['tr',4,6], ['tr',4,7], ['tr',4,8]],
          [['tr',5,1], ['tr',5,2], ['tr',5,3], ['tr',5,4], ['tr',5,5], ['tr',5,6], ['tr',5,7], ['tr',5,8]],
          [['tr',6,1], ['tr',6,2], ['tr',6,3], ['tr',6,4], ['tr',6,5], ['tr',6,6], ['tr',6,7], ['tr',6,8]],
          [['tr',7,1], ['tr',7,2], ['tr',7,3], ['tr',7,4], ['tr',7,5], ['tr',7,6], ['tr',7,7], ['tr',7,8]],
          [['tr',8,1], ['tr',8,2], ['tr',8,3], ['tr',8,4], ['tr',8,5], ['tr',8,6], ['tr',8,7], ['tr',8,8]]
        ]
    );
    return {position,setPosition};
}
export default White;