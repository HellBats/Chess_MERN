import { useState,useEffect } from "react";

export default function BoardGenerator() {
  const [move,setMove] = useState([]);
  const [position,setPosition] = useState(
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
  );
    return (
      <div className="container" >
         {position.map(row=>
            row.map((box)=>
              {
                let rank = box[1];
                let column = box[2];
                let src = "src/assets/"+position[rank-1][column-1][0]+".png";
                return <Piece key={rank*8+box[1]*8+box[2]} src={src}
                row_={rank} column={column} position={position} 
                setPosition={setPosition} move={move} setMove={setMove}></Piece>
              }
            )
        )
            }
      </div>
    );
  }

function Piece({src,row_,column,position,setPosition,move,setMove})
  {
    function Move(){  
      let cords = [...move,[row_,column]];
      setMove(cords);
    }

    useEffect(() => {
      if (move.length == 2) {
        MovetoPiece(move, setMove, position, setPosition);
        setMove([]);
      }
    }, [move, position, setMove, setPosition]);


    return (
    <>
    <img className= "piece" src={src}
    style={{gridRow:position[row_-1][column-1][1],gridColumn:position[row_-1][column-1][2]}} onClick={()=>Move()}/>
    </>
    );
  }

function MovetoPiece(move,setMove,position,setPosition)
{
  let new_position = [...position];
  let piece1_row = move[0][0];
  let piece1_column = move[0][1];
  let piece2_row = move[1][0];
  let piece2_column = move[1][1];
  new_position[piece1_row-1][piece1_column-1][1] = piece2_row;
  new_position[piece1_row-1][piece1_column-1][2] = piece2_column;
  new_position[piece2_row-1][piece2_column-1][1] = piece1_row;
  new_position[piece2_row-1][piece2_column-1][2] = piece1_column;
  setPosition(new_position);
}