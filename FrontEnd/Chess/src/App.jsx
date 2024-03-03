
import BoardGenerator from './Components/DefaultBoardLayout';
import TopBar from './Components/TopBar';
import './App.css'


function App() {
  return (
    <div>
      <TopBar/>
      <div className='Layout'>
      <BoardGenerator color={false}></BoardGenerator>
      </div>
    </div>
  )
}




export default App
