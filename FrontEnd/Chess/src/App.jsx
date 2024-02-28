
import { useState } from 'react';
import './App.css'

function App() {

  let chess_board = [];
  let pieces = [];
  {
    for(let i=7;i>=0;i--)
    {
      let row = [];
      for(let j=0;j<8;j++)
      {
          row.push([String.fromCharCode(65+j)+(i+1)])
      }
      chess_board.push(row);
    }
  }
  const [board,setBoard] = useState(chess_board);
  return (
    <div>
      <TopBar/>
      <div className='Layout'>
      <BoardGenerator board={board}></BoardGenerator>
      </div>
    </div>
  )
}

function TopBar()
{
  return (
    <div className='TopBar'>
        <img id="Icon" src="src/assets/Icon.jpg"></img>
        <div id="Heading">ZoanFruit</div>
    </div>
  )
}

function BoardGenerator({board}) {
  let pieces = ['br','bn','bb','bq','bk','bb','bn','br'
                ,'bp','bp','bp','bp','bp','bp','bp','bp'
                ,'wp','wp','wp','wp','wp','wp','wp','wp'
                ,'wr','wn','wb','wq','wk','wb','wn','wr'];
  let iterator = 0;
  let pass = 0;
  let row = 0;
  let color = false;
  return (
    <div className="container">
      {board.map(row=>
          row.map((box)=>
            {
              if(iterator<16)
              {
                let src = "src/assets/"+pieces[iterator]+".png";
                iterator++;
                return <img className= "piece" src={src}/>;
              }
              if(pass<32)
              {
                pass++
                return <img/>;
              }
              else
              {
                let src = "src/assets/"+pieces[iterator]+".png";
                iterator++;
                return <img className= "piece" src={src}/>;
              }
            }
          )
      )
      }
    </div>
  );
}


export default App
