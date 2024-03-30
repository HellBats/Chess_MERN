import { Link } from "react-router-dom";

export default function HomeRight()
{
    return(
    <>
        <div className="RightCard">
            <h1>Welcome to ZoanFruit Chess</h1>
            <Link to='/play' style={{ textDecoration: 'none' }}>
            <div className="RightCardButton"><h3>Play</h3></div>
            </Link>
        </div>
    </>
    )
}