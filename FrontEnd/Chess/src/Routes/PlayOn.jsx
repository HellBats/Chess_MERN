import TopBar from "../Components/ui/TopBar"
import BoardGenerator from '../Components/DefaultBoardLayout'
import { useRecoilValue } from "recoil"
import { Id, start_game } from "../Store/Atoms/UtilityAtoms"
import PlayControl from "../Components/ui/PlayControl";
import { JoinEvent } from "../Functions/ConnectionFunctions";
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
        return <BoardGenerator></BoardGenerator>
    }
    else return <PlayControl></PlayControl>
}
