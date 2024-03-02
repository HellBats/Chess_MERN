import { useState,useEffect,useRef } from "react";


export default function BoardGenerator() {
  //This reference hook and function is used to detect postion of click and then row and column 
  //are calculated and then sends to Move Function for further processing
  const divRef = useRef(null);
  const handleClick = (event) => {
    const rect = divRef.current.getBoundingClientRect();
      const clickX = event.clientX-rect.left;
      const clickY = event.clientY-rect.top;
      if(clickX>0 && clickX<720 && clickY>0 && clickY<720)
      {
        const board_length = 720;
        const blockX = Math.floor(clickX/board_length*8+1);
        const blockY = Math.floor(clickY/board_length*8+1);
        Move({ row: blockX, column: blockY, move, setMove,position,setPosition });
      }
  };
  //This hook detect clicks
  useEffect(() => {
    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Move State is used to keep check of clicks happening on boards
  const [move,setMove] = useState([]);
  //Position state is used to maintain a state of Chess board
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
  let key = 0;
    return (
      <div className="container" ref={divRef}>
         {
         position.map(row=>
            row.map((box)=>
              {
                //This rank and column use values from position and so exchange of position is necessary
                let rank = box[1];
                let column = box[2];
                key++;
                if(position[rank-1][column-1][0]!='tr')
                {
                  let src = "src/assets/"+position[rank-1][column-1][0]+".png";
                  return <Piece  key={key} src={src}
                  row_={rank} column={column} position={position} 
                  setPosition={setPosition} move={move} setMove={setMove}></Piece>
                  }
              }
            )
        )
            }
      </div>
    );
  }

function Piece({src,row_,column,position})
  {
    //This is the Piece Component that renders according to position state
    const pieceType = position[row_ - 1][column - 1][0];
    if (pieceType !== 'tr' && pieceType !== undefined) {
      return (
        <img
          className="piece"
          src={src}
          style={{
            gridRow: position[row_ - 1][column - 1][1],
            gridColumn: position[row_ - 1][column - 1][2],
          }}
        />
      );
    } else {
      return null; // or render an empty component, depending on your preference
    }
  }

function Move({ row, column, move, setMove,position,setPosition}) {  
  //This function check for no of click and if click was on a piece or an empty space and also clear
  //move after two valid clicks  
  setMove(prevMove => {
      const cords = [...prevMove, [column, row]];
      if(cords.length==1)
      {
        if(position[column-1][row-1][0]!='tr')
        {
          return cords;
        }
        else
        {
          return [];
        }
      }
      if(cords.length==2)
      {
        MovetoPiece({cords,position,setPosition});
        return [];
      }
    });
  }
  


function MovetoPiece({cords,setPosition})
{
  setPosition(prevPosition=>
    {
    // Getting the privous state from position and trying to update it into new state by getting 
    // cords for Move function 
    let new_position = [...prevPosition];
    let piece1_row = cords[0][0];
    let piece1_column = cords[0][1];
    let piece2_row = cords[1][0];
    let piece2_column = cords[1][1];
  
    //Updating the row and column value of piece to be moved
    new_position[piece1_row - 1][piece1_column - 1][1] = piece2_row;
    new_position[piece1_row - 1][piece1_column - 1][2] = piece2_column;
    //Exchanging the postion of piece to the position to be moved to because when rendered
    // mapping happens and it takes row and columns value to check if image is 'tr' or not
    //and so if position in array not excjanged then it will get ignored
    new_position[piece2_row - 1][piece2_column - 1] = new_position[piece1_row - 1][piece1_column - 1];
    return new_position;
  });
}