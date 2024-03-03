import { useState,useEffect,useRef } from "react";
import White from "../Functions/Racist";
import ValidMoves from "../Functions/PieceLogic/MainLogic";

// Color value true means white else black
export default function BoardGenerator({color}) {
  //This reference hook and function is used to detect postion of click and then row and column 
  //are calculated and then sends to Move Function for further processing
  const divRef = useRef(null);
  const handleClick = (event) => {
    const rect = divRef.current.getBoundingClientRect();
      const clickX = event.clientX-rect.left;
      const clickY = event.clientY-rect.top;
      const board_length = rect.right-rect.left;
      if(clickX>0 && clickX<board_length && clickY>0 && clickY<board_length)
      {
        const blockX = Math.floor(clickX/board_length*8+1);
        const blockY = Math.floor(clickY/board_length*8+1);
        Move({ row: blockX, column: blockY, move, setMove,position,setPosition,color});
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
    
  const {position,setPosition} = White(color);
   let key = 0;
    return (
      <div className="container" ref={divRef}>
         {
         position.map(row=>
            row.map((box)=>
              {
                //This rank and column use values from position and so exchange of tags is necessary
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

function Move({ row, column, setMove,position,setPosition,color}) {  
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
        MovetoPiece({cords,position,setPosition,color});
        return [];
      }
    });
  }
  


function MovetoPiece({cords,setPosition,color})
{
  setPosition(prevPosition=>
    {
    // Getting the privous state from position and trying to update it into new state by getting 
    // cords for Move function 
    let new_position = [...prevPosition];
    //Checks if we are trying to move piece to ints own position by checking tags
    if(prevPosition[cords[0][0]-1][cords[0][1]-1][0]==prevPosition[cords[1][0]-1][cords[1][1]-1][0])
    {return new_position;}
    if(ValidMoves({prevPosition,cords,color}))
    {
      let piece1_row = cords[0][0];
      let piece1_column = cords[0][1];
      let piece2_row = cords[1][0];
      let piece2_column = cords[1][1];

      // //Exchanging the tag of piece to the position to be moved to because when rendered
      // // mapping happens and it takes row and columns value to check if image is 'tr' or not
      // //and so if position in array not exchanged then it will get ignored
    
      new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
      new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
    }
    return new_position;
  });
}