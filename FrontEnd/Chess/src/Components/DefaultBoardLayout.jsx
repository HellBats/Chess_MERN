import { useState,useEffect,useRef } from "react";
import White from "../Functions/Racist";
import Piece from "./Piece";
import Move from "../Functions/MoveLogic";
import {Connection} from '../Functions/FirstConnection'
import { KingsAndRooks } from "../Functions/PieceLogic/CastlingLogic";
import CheckMate from "../Functions/CheckMate";
import Check from "../Functions/PieceLogic/Check";


// Color value true means white else black
export default function BoardGenerator() {
  //This reference hook and function is used to detect postion of click and then row and column 
  //are calculated and then sends to Move Function for further processing
  // Move State is used to keep check of clicks happening on boards
  const [move,setMove] = useState([]);
  const [king_move,setKing_move] = useState([false,false,0]);
  const [rook_move,setRook_move] = useState([[false,false],[false,false]]);
  //Position state is used to maintain a state of Chess board
  const {position,setPosition} = White();
  const [color,setColor] = useState(false);
  const [id,setId] = useState('');
  const [room,setRoom] = useState('');
  const [turn,setTurn] = useState(color);
  const [check,setCheck] = useState(false);
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
        Move ({ row: blockX, column: blockY, move, setMove,position,setPosition,
          color,king_move,setKing_move,rook_move,setRook_move,turn,setTurn,id,room,
          check,setCheck});
      }
  };
  Connection({id,setId,position,setPosition,color,setColor,turn,setTurn,room,setRoom});
  //This hook detect clicks
  useEffect(() => {
    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [position,color,turn,check]);//This position depedency is here becauce we want that move function takes new position 
  // instead old position 

  useEffect(()=>
  {
    setCheck(Check(position,color));
    if(check)
    {
      if(!CheckMate({position,color}))
      {
        console.log('Game Over');
      }
    }
  },[position,color,check])

  KingsAndRooks({position,king_move,setKing_move,setRook_move,color})
   let key = 0;
    return (
      <>
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
                  row_={rank} column={column} position={position}></Piece>
                  }
              }
            )
        )
            }
      </div>
      </>
    );
  }

