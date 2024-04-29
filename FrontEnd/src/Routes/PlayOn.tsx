import TopBar from "../Components/ui/TopBar"
import { useRecoilValue } from "recoil"
import { Id, start_game } from "../Store/Atoms/UtilityAtoms"
import PlayControl from "../Components/ui/PlayControl";
import { JoinEvent } from "../hooks/SocketConnection";
import { clock_time } from "../Store/Atoms/TimeAtoms";
import BoardGenerator from "../Components/Board";

interface PlayInterfaceProps{
    startgame:boolean,
    id:string,
    clock_time_:[number,number]
}
export default function Play()
{
    const startgame = useRecoilValue(start_game);
    const id = useRecoilValue(Id);
    const clock_time_ = useRecoilValue(clock_time);
    return (
        <div>
            <TopBar/>
            <div className='Layout'>
                <PlayInterface startgame={startgame} id={id} clock_time_={clock_time_}></PlayInterface>
            </div>
        </div>
    )
}
 
function PlayInterface({startgame,id,clock_time_}:PlayInterfaceProps)
{
    if(startgame)
    {
        JoinEvent({id,clock_time_});
        return <BoardGenerator></BoardGenerator>
    }
    else return <PlayControl></PlayControl>
}
