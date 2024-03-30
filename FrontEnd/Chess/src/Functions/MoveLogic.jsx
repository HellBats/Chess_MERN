import { Turn } from "./FirstConnection";
import {CastleMoved} from "./PieceLogic/CastlingLogic"
import Check from "./PieceLogic/Check"
import ValidMoves from "./PieceLogic/MainLogic";


export function Move({ row, column,position,setPosition,move,setMove,
  colors,turn_,setTurn,check,setCheck,id,setPromotion,setPawnCords,king_move,rook_moves,old_position}) {  
    //This function check for no of click and if click was on a piece or an empty space and also clear
    //move after two valid clicks
    const cords = [...move, [column, row]];
    let piece_color = position[column-1][row-1][0][0]=='w'?true:false;
    let my_turn = (piece_color && colors && turn_) || (!piece_color && !colors && !turn_);
    if(cords.length==1)
      {
        setMove(()=>{
          if((!my_turn)) return [];
          if(position[column-1][row-1][0]!='tr') return cords;
          else return [];
        })
      }
    if(cords.length==2)
      {
        setMove([]);
        MovetoPiece({cords,position,setPosition,colors,setTurn,check,setCheck,
          id,setPromotion,setPawnCords,king_move,rook_moves,old_position});
      }
  }
    
  
  function MovetoPiece({cords,position,setPosition,colors:color,setTurn,check,setCheck,
    id,setPromotion,setPawnCords,king_move,rook_moves,old_position})
  {
    if(position[cords[0][0]-1][cords[0][1]-1][0]==position[cords[1][0]-1][cords[1][1]-1][0])
      {return ;}
      // Getting the privous state from position and trying to update it into new state by getting 
      // cords for Move function 
      let new_position = JSON.parse(JSON.stringify(position));
      //Checks if we are trying to move piece to ints own position by checking tags
      const piece_move = ValidMoves({position,old_position,cords,color,king_move,rook_moves});
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
          new_position = JSON.parse(JSON.stringify(position));
        }
        else
        {
          setCheck(false);
          setTurn(prev=>!prev);
          Turn({id,new_position});
        }
      }
      else if(piece_move ==='castle' && castle_validator)
      {
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
        Turn({id,new_position});
        return !prev;
      });
      }
      else if(piece_move ==='promotion')
      {
        let piece1_row = cords[0][0];
        let piece1_column = cords[0][1];
        let piece2_row = cords[1][0];
        let piece2_column = cords[1][1];
  
        // //Exchanging the tag of piece to the position to be moved to because when rendered
        // // mapping happens and it takes row and columns value to check if image is 'tr' or not
        // //and so if position in array not exchanged then it will get ignored
        setPromotion(true);
        new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
        new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
        setPawnCords([piece2_row,piece2_column]);
      }
      else if(piece_move === 'enpassant')
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
          new_position[piece1_row-1][piece2_column - 1][0] = 'tr';
          new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
          Turn({id,new_position});
          return !prev;
          });
      }
      else if(piece_move)
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
        Turn({id,new_position});
        return !prev;
        });
      }
    if(piece_move)setPosition(new_position);
  }