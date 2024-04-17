import { Link } from "react-router-dom";

export default function HomeRight()
{
    return(
    <>
        <div className="flex flex-col justify-center" >
            <div className="text-white text-6xl md:text-9xl text-center">Welcome to ZoanFruit Chess</div>
            <div className="flex md:justify-between justify-center md:mr-24">
            <img src={'src/assets/10123388.svg'} className="w-80 ml-16"></img>
                <div>
                    <div className="text-white text-2xl text-center w-80 ">Play chess with other people online or 
                    challange your friends in different gamemodes</div>

                    <Link to='/play' style={{ textDecoration: 'none' }} className="flex justify-center mt-4">
                    <div className="text-white text-center bg-lime-300 w-60 h-15 rounded-md text-4xl p-1 shadow-md 
                    shadow-lime-200"><h3>Play</h3></div>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}