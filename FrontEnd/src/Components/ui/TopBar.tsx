import { Link } from "react-router-dom";

export default function TopBar()
{
  return (
    <header className="flex justify-between">
        <Link to='/'>
          <div className='flex'>
            <img src="/src/assets/gomu-gomu.png" className="max-w-12 max-h-12 object-contain md:max-w-14 md:max-h-14"></img>
            <div className="text-2xl md:text-3xl font-bold text-white mt-4">ZoanFruit</div>
          </div>
        </Link>
        <div className="font-bold text-white mt-6">About</div>
        <div className="flex">
        <Link to='/login'>
          <div className="font-bold text-white mt-4 mr-5 md:mr-8 bg-gradient-to-r from-red-500 to-orange-500 p-1 md:px-2 md:mb-2 rounded-md">
            <div>Login</div>
          </div>
          </Link>
        <Link to='/sign-up'>
          <div className="font-bold text-white mt-4 mr-5 md:mr-8 bg-gradient-to-r from-red-500 to-orange-500 p-1 md:px-2 md:mb-2 rounded-md">
            <div>SignUp</div>
          </div>
          </Link>
        </div>
      </header>
  )
}