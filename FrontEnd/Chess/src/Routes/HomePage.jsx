import TopBar from "../Components/TopBar"
import HomeRight from '../Components/HomePageRightSide'

export default function Home()
{
  return (
    <div>
        <TopBar/>
        <div className='mt-20 flex justify-center'>
          <HomeRight/>
        </div>
    </div>
  )
}