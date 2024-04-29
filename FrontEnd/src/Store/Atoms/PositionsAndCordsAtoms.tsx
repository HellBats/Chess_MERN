import {EmptyBoard} from "../../Functions/Racist";
import {atom} from 'recoil';

export const positions = atom({
    key: 'position',
    default: EmptyBoard() as [[[string,number,number]]],
});

export const moves = atom({
    key: 'moves',
    default:[[-1,-1],[-1,-1]] as [[number,number],[number,number]],
});

export const king_moves = atom({
    key: 'king_moves',
    default:false as boolean,
})

export const rook_move = atom({
    key: 'rook_move',
    default: [false,false] as [boolean,boolean],
})

export const old_positions = atom({
    key: 'old_positions',
    default: [] as [],
})

export const previous_positions = atom({
    key:'previous_positions',
    default: [] as [],
})

export const pawn_cords = atom({
    key: 'pawn_codrds',
    default:[] as number[],
})