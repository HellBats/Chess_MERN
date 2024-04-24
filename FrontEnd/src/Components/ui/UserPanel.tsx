import { memo } from "react";
import { mytime, optime } from "../../Store/Atoms/TimeAtoms";
import { useRecoilValue } from "recoil";

function UserPanel({my_time})
{
    const player_time = useRecoilValue(mytime);
    const oponent_time = useRecoilValue(optime);
    const time = my_time?player_time:oponent_time;
    return(
    <div className="flex p-3 justify-between w-96 md:w-2/5 text-white">
        <div className='flex '>
            <img src="src/assets/user-image.svg" className="w-8 h-8"></img>
            <div>You</div>
        </div>
        <div className="bg-purple-950 px-3 text-center rounded-md ">{time[0]+':'+time[1]}</div>
    </div>
    );
}

export default memo(UserPanel)