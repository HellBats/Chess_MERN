import { memo } from "react";

function UserPanel({my_time})
{
    return(
    <div className="flex p-3 justify-between w-96 md:w-2/5 text-white">
        <div className='flex '>
            <img src="src/assets/user-image.svg" className="w-8 h-8"></img>
            <div>You</div>
        </div>
        <div className="bg-purple-950 px-3 text-center rounded-md ">{my_time[0]+':'+my_time[1]}</div>
    </div>
    );
}

export default memo(UserPanel)