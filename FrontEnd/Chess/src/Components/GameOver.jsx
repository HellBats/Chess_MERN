import { useRecoilValue} from "recoil";
import {gameover, gameovermessage } from "../Store/Atoms/UtilityAtoms";

export default function GameOver()
{
    const game_over = useRecoilValue(gameover); 
    const game_over_message = useRecoilValue(gameovermessage);
    if(game_over)
    {
        return (<div className="EndGame">
            {game_over_message}
        </div>)
    }
    else
    {
        return <div></div>
    }
}