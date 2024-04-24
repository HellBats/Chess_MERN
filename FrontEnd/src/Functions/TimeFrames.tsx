import { SetterOrUpdater } from "recoil";

enum time_frame_image
{
    Bullet = 'icons8-ammo-48',
    Blitz = 'icons8-lightning-bolt-40',
    Rapid = 'icons8-stopwatch-48',
    None = 'null'
}

export type timeframetypes = Array<time_frame_image | number>

export interface ShowTimeFramesProps{
    timeframes: Array<timeframetypes>,
    setTimeFrame:SetterOrUpdater<Array<timeframetypes>>;
}

export interface HideTimeFramesProps{
    timeframe:timeframetypes,
    SetClockTime:SetterOrUpdater<[number, number]>
    number:number
}


export const ShowTimeFrames = ({timeframes,setTimeFrame}:ShowTimeFramesProps) =>{
    if(!timeframes.length) setTimeFrame([[time_frame_image.Bullet,1,2],[time_frame_image.Blitz,5,10],
        [time_frame_image.Rapid,15,30]]);
    else setTimeFrame([]);
}


export const HideTimeFrames = ({timeframe,SetClockTime,number}:HideTimeFramesProps) =>{
    const time = timeframe[number];
    if (typeof time === "number") SetClockTime([time,0]);
}

export const StartGame = ({setStartGame}:{setStartGame:SetterOrUpdater<boolean>}) =>{
    setStartGame(true);
}