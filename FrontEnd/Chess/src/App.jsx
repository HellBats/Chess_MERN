
import BoardGenerator from './Components/DefaultBoardLayout';
import TopBar from './Components/TopBar';
import './App.css'
import { RecoilRoot } from 'recoil';



function App() {

  return (
    <div>
      <RecoilRoot>
        <TopBar/>
        <div className='Layout'>
        <BoardGenerator></BoardGenerator>
      </div>
      </RecoilRoot>
    </div>
  )
}




export default App
