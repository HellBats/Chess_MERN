import TopBar from "../Components/TopBar"
import BoardGenerator from "../Components/DefaultBoardLayout"


export default function Play()
{
    return (
        <div>
            <TopBar/>
            <div className='Layout'>
            <BoardGenerator></BoardGenerator>
            </div>
        </div>
    )
}
