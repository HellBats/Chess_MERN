import {useEffect, useRef} from "react";
import Piece from "./ui/Piece.tsx";
import {useConnection} from '../hooks/SocketConnection'
import { useRecoilValue,useSetRecoilState, useRecoilState } from "recoil";
import useHandleClicks from "../hooks/useHandleClicks.tsx";
import { highlight_move, pawnform,turn,promotions,Id, board_mounts, gameover, gameovermessage, color} from "../Store/Atoms/UtilityAtoms";
import { positions,pawn_cords} from "../Store/Atoms/PositionsAndCordsAtoms";
import GameOver from "./ui/GameOverCard";
import UserPanel from "./ui/UserPanel";
import {useControlTimers} from "../hooks/Clocks.tsx"
import { useMovetoPiece } from "../hooks/useUpdatePosition.tsx";
import { BlackBoard, WhiteBoard } from "../Functions/Racist.tsx";

// Color value true means white else black
export default function BoardGenerator() {
  const pawnforms = useRecoilValue(pawnform);
  const highlight_moves = useRecoilValue(highlight_move);
  const [turn_,setTurn] = useRecoilState(turn);
  const [position,setPosition] = useRecoilState(positions);
  const [pawn_cord,setPawnCords] = useRecoilState(pawn_cords);
  const setPawnsForms = useSetRecoilState(pawnform);
  const setPromotion = useSetRecoilState(promotions);
  const [boardmounts,setBoardMounts] = useRecoilState(board_mounts);
  const id = useRecoilValue(Id);
  const divRef = useRef(null);
  const game_over = useRecoilValue(gameover);
  const gameover_message = useRecoilValue(gameovermessage);
  const colors  = useRecoilValue(color);
  useControlTimers();
  useConnection();
  useHandleClicks({divRef});
  useMovetoPiece();

  useEffect(()=>{
    if(colors) {setPosition(()=>{
      return WhiteBoard() as [[[string,number,number]]]
      });
    }
  },[colors]);
  useEffect(()=>{
    setBoardMounts((prev:number)=>{
      return prev+1;
    })
  },[position]);
   let key = 0;
    return (
      <>
      <div className="GameBoard mt-10 md:mt-0">
        <div className="z-1">
          <div className="flex justify-center">
            <UserPanel my_time={false}></UserPanel>
          </div>
          <div className="flex justify-center">
            <div className="bg-[url('src/assets/CheesBoardPurple.png')] w-96 h-96 ml-3 bg-cover
            grid grid-cols-8 grid-rows-8 object-cover md:w-2/5 md:h-2/5 relative rounded-md" ref={divRef}>
                <GameOver game_over={game_over} game_over_message={gameover_message}></GameOver>
                {highlight_moves.map(high=>
                {
                  return <div className="bg-orange-300 object-cover z-1" 
                  key={high[0]+high[1]} style={{gridRow:high[0], gridColumn:high[1]}}></div>
                })}
                
                {
                position.map(row=>
                    row.map((box)=>
                      {
                        //This rank and column use values from position and so exchange of tags is necessary
                        const rank = box[1];
                        const column = box[2];
                        key++;
                        if(position[rank-1][column-1][0]!='tr')
                        {
                          const src = "src/assets/"+position[rank-1][column-1][0]+".png";
                          return <Piece  key={key} src={src}
                          row_={rank} column={column} position={position}></Piece>
                          }
                      }
                    )
                  )
                  }
              </div>
              <div className="md:w-16 ">
                  {pawnforms.map(pawns =>
                  {  
                    return <img src={'src/assets/'+pawns+'.png'} key={pawns} onClick={()=>Promotion({pawns,
                    setTurn,position,setPosition,pawn_cord,setPawnCords,setPawnsForms,setPromotion,id})}></img>
                  })}
              </div>
            </div>
            <div className="flex justify-center">
              <UserPanel my_time={true} ></UserPanel>
            </div>
          </div>
        </div>
      </>
    );
  }
