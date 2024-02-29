import { useState } from 'react';
import BoardGenerator from './Components/DefaultBoardLayout';
import TopBar from './Components/TopBar';
import './App.css'

function App() {

  let chess_board = [];
  {
    for(let i=8;i>0;i--)
    {
      let row = [];
      for(let j=1;j<9;j++)
      {
          row.push([i.toString()+j.toString()])
      }
      chess_board.push(row);
    }
  }
  let positions = [["bq",1,4]];
  const [pieces_pos,setPieces] = useState();
  return (
    <div>
      <TopBar/>
      <div className='Layout'>
      <BoardGenerator board={chess_board}></BoardGenerator>
      </div>
    </div>
  )
}


export default App
