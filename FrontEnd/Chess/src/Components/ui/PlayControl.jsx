import { useRecoilState, useSetRecoilState } from 'recoil'
import { clock_time, time_frames } from '../../Store/Atoms/TimeAtoms';
import { start_game } from '../../Store/Atoms/UtilityAtoms';
import { ShowTimeFrames,HideTimeFrames,StartGame } from '../../Functions/TimeFrames';


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
                <div className='text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm 
                rounded-md flex justify-between' 
                onClick={()=>ShowTimeFrames({timeframes,setTimeFrame})}>
                    <div>{clock_time_[0]+'min'}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>


                {timeframes.map(timeframe=>
                {

                    return <div key={timeframe[0]}>
                        <img src={'src/assets/'+timeframe[0]+'.png'} className='w-7 h-7'></img>
                        <div className='w-80 flex flex-row'>
                            <div className='w-36 text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm m-2
                            rounded-md'  onClick=
                            {()=>HideTimeFrames({timeframe,number:1,SetClockTime})}>
                                {timeframe[1]+'min'}</div>
                            <div className='w-36 text-center bg-black opacity-30 text-white p-2 backdrop-blur-sm m-2
                            rounded-md'  onClick=
                            {()=>HideTimeFrames({timeframe,number:2,SetClockTime})}>
                                {timeframe[2]+'min'}</div>    
                        </div>
                    </div>
                })}
                <div className='flex justify-center'>
                    <div className='text-white text-center bg-lime-300 w-60 h-15 rounded-md text-4xl p-1 shadow-md 
                        shadow-lime-200 mt-5' onClick={()=>StartGame({setStartGame})}><h3>Play</h3></div>
                </div>
            </div>
        </div>
        </>
    )
}
