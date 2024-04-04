import { useRecoilState, useSetRecoilState } from 'recoil'
import { clock_time, time_frames } from '../Store/Atoms/TimeAtoms';
import { start_game } from '../Store/Atoms/UtilityAtoms';
import { ShowTimeFrames,HideTimeFrames,StartGame } from '../Functions/TimeFrames';


export default function PlayControl()
{
    const [timeframes,setTimeFrame] = useRecoilState(time_frames);
    const [clock_time_,SetClockTime] = useRecoilState(clock_time);
    const setStartGame = useSetRecoilState(start_game);
    return (
        <>
        {/* <div className=' w-96 h-96 mt-20 ml-4 bg-[url("src/assets/CheesBoardPurple.png")] bg-cover'></div> */}
        <div className='flex justify-center mt-40'>
            <div className='w-80'>
                <div className='text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm rounded-md' onClick={()=>ShowTimeFrames({timeframes,setTimeFrame})}>
                    {clock_time_[0]+'min'}</div>
                {timeframes.map(timeframe=>
                {
                    return <div className='w-80 flex flex-row' key={timeframe[0]}>
                        <div>Bullet</div>
                        <div className='w-32 text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm m-2
                        rounded-md'  onClick=
                        {()=>HideTimeFrames({timeframe,number:0,SetClockTime})}>
                            {timeframe[0]+'min'}</div>
                        <div className='w-32 text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm m-2
                        rounded-md'  onClick=
                        {()=>HideTimeFrames({timeframe,number:1,SetClockTime})}>
                            {timeframe[1]+'min'}</div>    
                    </div>
                })}
                <div className='text-center' onClick={()=>StartGame({setStartGame})}><h3>Play</h3></div>
            </div>
        </div>
        </>
    )
}
