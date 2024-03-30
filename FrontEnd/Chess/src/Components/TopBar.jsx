export default function TopBar()
{
  return (
    <header className='TopBar'>
        <div className="IconBar">
          <img className="Icon" src="/src/assets/gomu-gomu.png"></img>
          <div className="Heading">ZoanFruit</div>
        </div>
          <div className="topbar-text">About</div>
          <div className="IconBar">
            <div className="button">
              <div>Login</div>
            </div>
            <div className="button">
              <div>SignUp</div>
            </div>
          </div>
      </header>
  )
}