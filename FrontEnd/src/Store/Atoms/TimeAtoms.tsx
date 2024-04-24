import {atom} from 'recoil';
import { timeframetypes } from '../../Functions/TimeFrames';

export const mytime = atom({
    key: 'mytime',
    default: [0,0],
})

export const optime = atom({
    key: 'optime',
    default: [0,0],
})

export const clock_time = atom({
    key: 'clocktime',
    default: [10,0] as [number,number], 
})

export const time_frames = atom({
    key:"timeframes",
    default: [['null',0,0]] as Array<timeframetypes>,
}) 