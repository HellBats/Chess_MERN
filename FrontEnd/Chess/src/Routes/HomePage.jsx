import TopBar from "../Components/ui/TopBar"
import HomeRight from '../Components/ui/HomePageRightSide'

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