import Bishop from "../Functions/PieceLogic/BishopLogic";
import King from "../Functions/PieceLogic/KingLogic";
import Knight from "../Functions/PieceLogic/KnightLogic";
import Pawn from "../Functions/PieceLogic/PawnLogic";
import Queen from "../Functions/PieceLogic/QueenLogic";
import Rook from "../Functions/PieceLogic/RookLogic";

export enum event{
    NormalMove,
    Capture,
    Enpassant,
    Castling,
    Promotion,
    Check,
    CheckMate,
    None
}

export const useMovetoPiece = ({cords,position,setPosition,colors:color,setTurn,check,setCheck,
    id,setPromotion,setPawnCords,king_move,rook_moves,old_position}) =>{
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
  //This Function will control all the Logic of pieces
const ValidMoves = ({position:prevPosition,old_position,cords,color,king_move,rook_moves}) =>
  {
    const [rank,file] = [cords[0][0],cords[0][1]];
    const [rank_to,file_to] = [cords[1][0],cords[1][1]];
    const piece = prevPosition[rank-1][file-1][0];
    const piece_to = prevPosition[rank_to-1][file_to-1][0];
    const piece_color = color?'w':'b';
      if(piece_color!=piece[0]) return false;
      if(piece=='bp' || piece=='wp'){return Pawn({prevPosition,old_position,cords,color});}
      if(piece=='br' || piece=='wr'){return Rook({prevPosition,cords});}
      if(piece=='bb' || piece=='wb'){return Bishop({prevPosition,cords});}
      if(piece=='bq' || piece=='wq'){return Queen({prevPosition,piece,piece_to,cords});}
      if(piece=='bn' || piece=='wn'){return Knight({piece,piece_to,cords});}
      if(piece=='bk' || piece=='wk'){return King({prevPosition,piece,piece_to,rank,file,
          rank_to,file_to,color,king_move,rook_moves});}
      return false;
  }