export function ShowTimeFrames({timeframes,setTimeFrame})
{
    if(!timeframes.length) setTimeFrame([[1,2],[5,10],[15,30]]);
    else setTimeFrame([]);
}


export function HideTimeFrames({timeframe,SetClockTime,number})
{
    SetClockTime([timeframe[number],0]);
}

export function StartGame({setStartGame})
{
    setStartGame(true);
}