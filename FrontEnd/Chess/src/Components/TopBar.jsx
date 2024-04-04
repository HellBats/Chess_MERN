export default function TopBar()
{
  return (
    <header className="flex justify-between">
        <div className='flex'>
          <img src="/src/assets/gomu-gomu.png" className="max-w-12 max-h-12 object-contain md:max-w-14 md:max-h-14"></img>
          <div className="text-2xl md:text-3xl font-bold text-white mt-4">ZoanFruit</div>
        </div>
        <div className="font-bold text-white mt-6">About</div>
        <div className="flex">
          <div className="font-bold text-white mt-4 mr-5 md:mr-8 bg-cyan-600 p-1 md:px-2 md:mb-2 rounded-md">
            <div>Login</div>
          </div>
          <div className="font-bold text-white mt-4 mr-5 md:mr-8 bg-cyan-600 p-1 md:px-2 md:mb-2 rounded-md">
            <div>SignUp</div>
          </div>
        </div>
      </header>
  )
}