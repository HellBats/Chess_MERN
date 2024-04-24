
interface GameOverProps
{
    game_over:boolean,
    game_over_message:string
}
export default function GameOver({game_over,game_over_message}:GameOverProps)
{
    if(game_over)
    {
        return (<div className="absolute z-5 ml-40 mt-40 bg-white p-2 md:ml-96">
            {game_over_message}
        </div>)
    }
    else
    {
        return <div></div>
    }
}