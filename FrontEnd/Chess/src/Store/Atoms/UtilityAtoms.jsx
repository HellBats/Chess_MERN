import {atom, selector} from 'recoil';


export const color = atom({
    key:'color',
    default: false,
});

export const turn = atom({
    key:'turn',
    default: false,
});

export const checks = atom({
    key:'checks',
    default: false,
});

export const promotions = atom({
    key:'promotions',
    default: false,
});

export const pawnform = atom({
    key:'pawnform',
    default: [],
});

export const board_mounts = atom({
    key:'board_mounts',
    default: 0,
});

export const highlight_move = atom({
    key:'highlight_move',
    default: [],
});

export const start_game = atom({
    key:'start_game',
    default: false,
})

export const gameover = atom({
    key:'gameover',
    default: false,
})

export const gameovermessage = atom({
    key:'gameovermessage',
    default: 'hello',
})

export const Id = selector({
    key:'Id',
    default:'',
    get: async () =>
    {
        const response = await fetch('https://back.zoanfruit.xyz/getid');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.playid;
    }
});