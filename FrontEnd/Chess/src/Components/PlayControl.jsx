import { useRecoilState, useSetRecoilState } from 'recoil'
import home_image from '../assets/HomePageImage.png'
import { clock_time, time_frames } from '../Store/Atoms/TimeAtoms';
import { start_game } from '../Store/Atoms/UtilityAtoms';

export default function PlayControl()
{
    const [timeframes,setTimeFrame] = useRecoilState(time_frames);
    const [clock_time_,SetClockTime] = useRecoilState(clock_time);
    const setStartGame = useSetRecoilState(start_game);
    return (
        <>
        <img src={home_image}></img>
        <div className='RightCard'>
            <div className='Time' >
                <div className='TimeFrame' onClick={()=>ShowTimeFrames({timeframes,setTimeFrame})}>
                    {clock_time_[0]+'min'}</div>
                {timeframes.map(timeframe=>
                {
                    return <div className='TimeFramesPanel' key={timeframe[0]}>
                        <div className='TimeFrames'  onClick=
                        {()=>HideTimeFrames({timeframe,number:0,SetClockTime})}>
                            {timeframe[0]+'min'}</div>
                        <div className='TimeFrames'  onClick=
                        {()=>HideTimeFrames({timeframe,number:1,SetClockTime})}>
                            {timeframe[1]+'min'}</div>    
                    </div>
                })}
                <div className="RightCardButton" onClick={()=>StartGame({setStartGame})}><h3>Play</h3></div>
            </div>
        </div>
        </>
    )
}

function ShowTimeFrames({timeframes,setTimeFrame})
{
    if(!timeframes.length) setTimeFrame([[1,2],[5,10],[15,30]]);
    else setTimeFrame([]);
}


function HideTimeFrames({timeframe,SetClockTime,number})
{
    SetClockTime([timeframe[number],0]);
}

function StartGame({setStartGame})
{
    setStartGame(true);
}