import { memo } from "react";

function UserPanel({my_time})
{
    return(
    <div className="UserPanel">
        <div className='profile'>
        <img src="src/assets/user-image.svg" className="profile-image"></img>
        <div>You</div>
        </div>
        <div className="Clock">{my_time[0]+':'+my_time[1]}</div>
    </div>
    );
}

export default memo(UserPanel)