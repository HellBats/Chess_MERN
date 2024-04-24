import {atom, selector} from 'recoil';


export const color = atom({
    key:'color',
    default: false as boolean,
});

export const turn = atom({
    key:'turn',
    default: false as boolean,
});

export const checks = atom({
    key:'checks',
    default: false as boolean,
});

export const promotions = atom({
    key:'promotions',
    default: false as boolean,
});

export const pawnform = atom({
    key:'pawnform',
    default: [] as [],
});

export const board_mounts = atom({
    key:'board_mounts',
    default: 0 as number,
});

export const highlight_move = atom({
    key:'highlight_move',
    default: [] as [],
});

export const start_game = atom({
    key:'start_game',
    default: false as boolean,
})

export const gameover = atom({
    key:'gameover',
    default: false as boolean,
})

export const gameovermessage = atom({
    key:'gameovermessage',
    default: 'hello' as string,
})

export const show_password = atom({
    key:'show_password',
    default: false as boolean,
})


export const Username = atom({
    key:'Username',
    default: '' as string,
})

export const Name = atom({
    key:'Name',
    default: '' as string,
})

export const Email = atom({
    key:'Email',
    default: '' as string,
})

export const Password= atom({
    key:'Password',
    default: '' as string,
})




export const Id = selector<string>({
    key:'Id',
    default:'' as string,
    get: async ():Promise<string> =>
    {
        const response = await fetch('https://back.zoanfruit.xyz/api/v1/user/getid');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.playid;
    }
});