import { useRecoilValue} from "recoil";
import {gameover, gameovermessage } from "../../Store/Atoms/UtilityAtoms";

export default function GameOver()
{
    const game_over = useRecoilValue(gameover); 
    const game_over_message = useRecoilValue(gameovermessage);
    if(game_over)
    {
        return (<div className="absolute z-5 ml-40 mt-40 bg-white p-2 md:ml-96">
            {game_over_message}
        </div>)
    }
    else
    {
        return <div></div>
    }
}