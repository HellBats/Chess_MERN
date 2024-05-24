import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ValidMoves from "../Functions/PieceLogic/MainLogic";
import { king_moves, moves, old_positions, pawn_cords, positions, rook_move } from "../Store/Atoms/PositionsAndCordsAtoms";
import { Id, board_mounts, checks, color, promotions, turn } from "../Store/Atoms/UtilityAtoms";
import Check from "../Functions/PieceLogic/Check";
import { Turn } from "./SocketConnection";
import { useEffect } from "react";

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


export const useMovetoPiece = () =>{
  const [position,setPosition] = useRecoilState(positions);
  const id = useRecoilValue(Id);
  const old_position = useRecoilValue(old_positions);
  const colors = useRecoilValue(color);
  const king_move = useRecoilValue(king_moves);
  const rook_moves = useRecoilValue(rook_move);
  const check = useRecoilValue(checks);
  const [turn_,setTurn] = useRecoilState(turn);
  const setCheck = useSetRecoilState(checks);
  const setPromotion = useSetRecoilState(promotions);
  const setPawnmove = useSetRecoilState(pawn_cords);
  const BoardMounts = useRecoilValue(board_mounts);
  const [move,setMove] = useRecoilState(moves);
  useEffect(()=>
  {
    if(BoardMounts<2){return;}
    if(move[1][0]==-1){return;}
    // if(!((colors && turn_) || (!color && !turn_ ))){return;}
    if(position[move[0][0]-1][move[0][1]-1][0]==position[move[1][0]-1][move[1][1]-1][0]){return ;}
        // Getting the privous state from position and trying to update it into new state by getting 
        // move for Move function 
        let new_position = JSON.parse(JSON.stringify(position));
        //Checks if we are trying to move piece to ints own position by checking tags
        const piece_move = ValidMoves({position,old_position,move,colors,king_move,rook_moves});
        console.log("hell");
        if(check)
        {
          if(piece_move==event.NormalMove || piece_move==event.Enpassant || piece_move==event.Capture || piece_move==event.Promotion)
          {
            const piece1_row = move[0][0];
            const piece1_column = move[0][1];
            const piece2_row = move[1][0];
            const piece2_column = move[1][1];
      
            // //Exchanging the tag of piece to the position to be moved to because when rendered
            // // mapping happens and it takes row and columns value to check if image is 'tr' or not
            // //and so if position in array not exchanged then it will get ignored
            new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
            new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
            if(Check({position:new_position,color:colors}))
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
        }
        else if(piece_move == event.Castling)
        {
          setTurn(prev=>{
          const piece1_row = move[0][0];
          const piece1_column = move[0][1];
          const piece2_row = move[1][0];
          const piece2_column = move[1][1];
    
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
        else if(piece_move == event.Promotion)
        {
          const piece1_row = move[0][0];
          const piece1_column = move[0][1];
          const piece2_row = move[1][0];
          const piece2_column = move[1][1];
    
          // //Exchanging the tag of piece to the position to be moved to because when rendered
          // // mapping happens and it takes row and columns value to check if image is 'tr' or not
          // //and so if position in array not exchanged then it will get ignored
          setPromotion(true);
          new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
          new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
          setPawnmove([piece2_row,piece2_column]);
        }
        else if(piece_move == event.Enpassant)
        {
          setTurn(prev=>{ //This is asychnorous function so to prevent it from double move we use callback function
            const piece1_row = move[0][0];
            const piece1_column = move[0][1];
            const piece2_row = move[1][0];
            const piece2_column = move[1][1];
      
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
        else if(piece_move == event.NormalMove)
        {
          console.log(position);
          setTurn(prev=>{ //This is asychnorous function so to prevent it from double move we use callback function
          const piece1_row = move[0][0];
          const piece1_column = move[0][1];
          const piece2_row = move[1][0];
          const piece2_column = move[1][1];
    
          // //Exchanging the tag of piece to the position to be moved to because when rendered
          // // mapping happens and it takes row and columns value to check if image is 'tr' or not
          // //and so if position in array not exchanged then it will get ignored
        
          new_position[piece2_row - 1][piece2_column - 1][0] = new_position[piece1_row - 1][piece1_column - 1][0];
          new_position[piece1_row - 1][piece1_column - 1][0] = 'tr';
          Turn({id,new_position});
          return !prev;
          });
        }
      setPosition(new_position);
      setMove([[-1,-1],[-1,-1]]);
  },[move])
  }
  //This Function will control all the Logic of pieces