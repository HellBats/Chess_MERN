import {useRef} from "react";
import Piece from "./ui/Piece.jsx";
import {Connection} from '../Functions/ConnectionFunctions.jsx'
import { KingsAndRooks } from "../Functions/PieceLogic/CastlingLogic";
import useSound from 'use-sound'
import audio from '../assets/move-self.mp3'
import HighlightUpdate from "../Functions/HighlightMoves";
import { usePawnFroms } from "../Functions/Promotion";
import {GameConditions} from "../Functions/GameConditons";
import { useRecoilValue,useSetRecoilState } from "recoil";
import HandleClicks from "../Functions/HandleClicks.jsx";
import { highlight_move, gameover, gameovermessage } from "../Store/Atoms/UtilityAtoms";
import { positions} from "../Store/Atoms/PositionsAndCordsAtoms";
import GameOver from "./ui/GameOver.jsx";
import UserPanel from "./ui/UserPanel.jsx";
import {ControlTimers} from "../Functions/Clocks.jsx"
import PawnPromotion from "./ui/PawnPromotion.jsx";
// Color value true means white else black
export default function BoardGenerator() {
  const highlight_moves = useRecoilValue(highlight_move);
  const position = useRecoilValue(positions);
  const setGameOver = useSetRecoilState(gameover); 
  const setGameOverMessage = useSetRecoilState(gameovermessage);
  const divRef = useRef(null);
  const [move_audio] = useSound(audio);

  Connection();
  ControlTimers();
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
            <UserPanel my_time={0}></UserPanel>
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
              <PawnPromotion></PawnPromotion>
            </div>
            <div className="flex justify-center">
              <UserPanel my_time={1} ></UserPanel>
            </div>
          </div>
            
        </div>
      </>
    );
  }
