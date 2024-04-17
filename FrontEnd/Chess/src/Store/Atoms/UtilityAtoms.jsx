import {atom, selector} from 'recoil';
import { Connection } from '../../Functions/ConnectionFunctions';


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

export const show_password = atom({
    key:'show_password',
    default: false,
})


export const Username = atom({
    key:'Username',
    default: '',
})

export const Name = atom({
    key:'Name',
    default: '',
})

export const Email = atom({
    key:'Email',
    default: '',
})

export const Password= atom({
    key:'Password',
    default: '',
})




export const Id = selector({
    key:'Id',
    default:'',
    get: async () =>
    {
        const response = await fetch('https://back.zoanfruit.xyz/api/v1/user/getid');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.playid;
    }
});