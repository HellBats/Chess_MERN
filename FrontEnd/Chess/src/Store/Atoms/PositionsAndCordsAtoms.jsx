import White from "../../Functions/Racist";
import {atom} from 'recoil';

export const positions = atom({
    key: 'position',
    default: White(),
});

export const moves = atom({
    key: 'moves',
    default:[],
});

export const king_moves = atom({
    key: 'king_moves',
    default:[false,false,0],
})

export const rook_move = atom({
    key: 'rook_move',
    default: [[false,false],[false,false]],
})

export const old_positions = atom({
    key: 'old_positions',
    default: [],
})

export const previous_positions = atom({
    key:'previous_positions',
    default: [],
})

export const pawn_cords = atom({
    key: 'pawn_codrds',
    default:[],
})