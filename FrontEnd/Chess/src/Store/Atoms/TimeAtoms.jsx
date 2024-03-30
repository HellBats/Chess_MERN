import {atom} from 'recoil';

export const mytime = atom({
    key: 'mytime',
    default: [],
})

export const optime = atom({
    key: 'optime',
    default: [],
})

export const clock_time = atom({
    key: 'clocktime',
    default: [10,0], 
})

export const time_frames = atom({
    key:"timeframes",
    default: [],
})