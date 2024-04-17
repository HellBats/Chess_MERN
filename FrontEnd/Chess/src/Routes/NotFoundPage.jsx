import { Link } from "react-router-dom"

export function ErrorPage()
{
   return (<>
    <div>404 not found</div>
    <Link to='/'>Got to HomePage</Link>
    </>
    )
}