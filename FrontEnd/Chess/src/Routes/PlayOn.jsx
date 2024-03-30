import TopBar from "../Components/TopBar"
import StartGame from "../Components/StartGame"
import { useRecoilValue } from "recoil"
import { Id, start_game } from "../Store/Atoms/UtilityAtoms"
import PlayControl from "../Components/PlayControl";
import { JoinEvent } from "../Functions/FirstConnection";
import { clock_time } from "../Store/Atoms/TimeAtoms";


export default function Play()
{
    const startgame = useRecoilValue(start_game);
    const id = useRecoilValue(Id);
    const clock_time_ = useRecoilValue(clock_time);
    return (
        <div>
            <TopBar/>
            <div className='Layout'>
                <Condor startgame={startgame} id={id} clock_time_={clock_time_}></Condor>
            </div>
        </div>
    )
}
 
function Condor({startgame,id,clock_time_})
{
    if(startgame)
    {
        JoinEvent({id,clock_time_});
        return <StartGame ></StartGame>
    }
    else return <PlayControl></PlayControl>
}
