
import { Turn } from "./FirstConnection";
import {CastleMoved} from "./PieceLogic/CastlingLogic"
import Check from "./PieceLogic/Check"
import ValidMoves from "./PieceLogic/MainLogic";

export default function Move({ row, column,position,setMove,setPosition,color,king_move,setKing_move,
  rook_move,setRook_move,turn,setTurn,id,room,check,setCheck}) {  
    //This function check for no of click and if click was on a piece or an empty space and also clear
    //move after two valid clicks
    setMove(prevMove=> {
      const cords = [...prevMove, [column, row]];
      let piece_color = position[column-1][row-1][0][0]=='w'?true:false;
      let my_turn = (piece_color && color && turn) || (!piece_color && !color && !turn);
      if(cords.length==1)
        {
          if((!my_turn)){return [];}
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
          MovetoPiece({cords,position,setPosition,color,king_move,setKing_move,rook_move,setRook_move,
            turn,setTurn,id,room,check,setCheck});
          return [];
        }
      }
    );
  }
    
  
  function MovetoPiece({cords,position,setPosition,color,king_move,turn,setTurn,rook_move,setRook_move,
  room,check,setCheck})
  {
    // CheckForCastle({position,cords,color,setKing_move,rook_move,setRook_move});
    if(position[cords[0][0]-1][cords[0][1]-1][0]==position[cords[1][0]-1][cords[1][1]-1][0])
      {return ;}
    setPosition(prevPosition=>
      {
      // Getting the privous state from position and trying to update it into new state by getting 
      // cords for Move function 
      let new_position = JSON.parse(JSON.stringify(prevPosition));
      //Checks if we are trying to move piece to ints own position by checking tags
      const piece_move = ValidMoves({prevPosition,cords,color,rook_move,setRook_move});
      const which_king = position[cords[0][0]-1][cords[0][1]-1][0];
      const castle_validator = CastleMoved(which_king,king_move);
      if(check && piece_move)
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
        if(Check(new_position,color))
        {
          new_position = [...prevPosition];
        }
        else
        {
          setCheck(false);
          setTurn(prev=>!prev);
          Turn({room,turn,new_position});
        }
      }
      else if(piece_move=='castle' && castle_validator)
      {
        console.log('moved');
        setTurn(prev=>{
        let piece1_row = cords[0][0];
        let piece1_column = cords[0][1];
        let piece2_row = cords[1][0];
        let piece2_column = cords[1][1];
  
        // //Exchanging the tag of piece to the position to be moved to because when rendered
        // // mapping happens and it takes row and columns value to check if image is 'tr' or not
        // //and so if position in array not exchanged then it will get ignored
      
        new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
        new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
        if(piece1_column>piece2_column)
        {
          new_position[piece2_row - 1][0][0] = 'tr';
          new_position[piece2_row - 1][2][0] = new_position[piece2_row - 1][piece2_column - 1][0][0]+'r';
        }
        else
        {
          new_position[piece2_row - 1][7][0] = 'tr';
          new_position[piece2_row - 1][5][0] = new_position[piece2_row - 1][piece2_column - 1][0][0]+'r';
        }
        Turn({room,turn,new_position});
        return !prev;
      });
      }
      else if(piece_move!='castle' && piece_move)
      {
        setTurn(prev=>{ //This is asychnorous function so to prevent it from double move we use callback function
        let piece1_row = cords[0][0];
        let piece1_column = cords[0][1];
        let piece2_row = cords[1][0];
        let piece2_column = cords[1][1];
  
        // //Exchanging the tag of piece to the position to be moved to because when rendered
        // // mapping happens and it takes row and columns value to check if image is 'tr' or not
        // //and so if position in array not exchanged then it will get ignored
      
        new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
        new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
        Turn({room,turn,new_position});
        return !prev;
        });
      }
      return new_position;
    });
  }