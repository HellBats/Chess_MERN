import TopBar from "../Components/TopBar"
import home_image from '../assets/HomePageImage.png'
import HomeRight from '../Components/HomePageRightSide'

export default function Home()
{
  return (
    <div>
        <TopBar/>
        <div className='Layout'>
        <img src={home_image}></img>
        <HomeRight/>
        </div>
    </div>
  )
}