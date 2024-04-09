export function ShowTimeFrames({timeframes,setTimeFrame})
{
    if(!timeframes.length) setTimeFrame([['icons8-ammo-48',1,2],['icons8-lightning-bolt-40',5,10],['icons8-stopwatch-48',15,30]]);
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