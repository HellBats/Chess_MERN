import {useRef} from "react";
import Piece from "./Piece";
import {Connection} from '../Functions/FirstConnection'
import { KingsAndRooks } from "../Functions/PieceLogic/CastlingLogic";
import useSound from 'use-sound'
import audio from '../assets/move-self.mp3'
import HighlightUpdate from "../Functions/HighlightMoves";
import { Promotion, usePawnFroms } from "../Functions/Promotion";
import {GameConditions} from "../Functions/GameConditons";
import { useRecoilValue,useSetRecoilState, useRecoilState } from "recoil";
import { mytime, optime } from "../Store/Atoms/TimeAtoms";
import HandleClicks from "./HandleClicks";
import { highlight_move, pawnform,turn,promotions,Id, gameover, gameovermessage } from "../Store/Atoms/UtilityAtoms";
import { positions,pawn_cords} from "../Store/Atoms/PositionsAndCordsAtoms";
import GameOver from "./GameOver";
import UserPanel from "./UserPanel";
import {ControlOpTimer, ControlTimer} from "../Functions/Clocks.jsx"

// Color value true means white else black
export default function BoardGenerator() {
  const my_time = useRecoilValue(mytime);
  const op_time = useRecoilValue(optime);
  const pawnforms = useRecoilValue(pawnform);
  const highlight_moves = useRecoilValue(highlight_move);
  const setTurn = useSetRecoilState(turn);
  const [position,setPosition] = useRecoilState(positions);
  const [pawn_cord,setPawnCords] = useRecoilState(pawn_cords);
  const setPawnsForms = useSetRecoilState(pawnform);
  const setPromotion = useSetRecoilState(promotions);
  const id = useRecoilValue(Id);
  const setGameOver = useSetRecoilState(gameover); 
  const setGameOverMessage = useSetRecoilState(gameovermessage);
  const divRef = useRef(null);
  const [move_audio] = useSound(audio);

  Connection();
  ControlTimer();
  ControlOpTimer();
  HandleClicks({divRef});
  GameConditions({setGameOver,setGameOverMessage});
  HighlightUpdate({move_audio})
  KingsAndRooks();
  usePawnFroms();

   let key = 0;
    return (
      <>
      <div className="GameBoard mt-10 md:mt-0">
        <div className="z-1">
          <div className="flex justify-center">
            <UserPanel my_time={op_time}></UserPanel>
          </div>
          <div className="flex justify-center">
            <div className="bg-[url('src/assets/CheesBoardPurple.png')] w-96 h-96 ml-3 bg-cover
            grid grid-cols-8 grid-rows-8 object-cover md:w-2/5 md:h-2/5 relative rounded-md" ref={divRef}>
                <GameOver></GameOver>
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
              <div className="md:w-16 ">
                  {pawnforms.map(pawns =>
                  {  
                    return <img src={'src/assets/'+pawns+'.png'} key={pawns} onClick={()=>Promotion({pawns,
                    setTurn,position,setPosition,pawn_cord,setPawnCords,setPawnsForms,setPromotion,id})}></img>
                  })}
              </div>
            </div>
            <div className="flex justify-center">
              <UserPanel my_time={my_time} ></UserPanel>
            </div>
          </div>
            
        </div>
      </>
    );
  }
