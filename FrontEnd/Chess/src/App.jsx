
import './App.css'

function App() {

  let chess_board = [];
  {
    for(let i=7;i>=0;i--)
    {
      let row = [];
      for(let j=0;j<8;j++)
      {
          row.push(String.fromCharCode(65+j)+(i+1))
      }
      chess_board.push(row);
    }
    console.log(chess_board);
  }
  return (
    <div>
      <div><h1 id='Heading'>Chess</h1></div>
      <div className='Layout'>
      <BoardGenerator board={chess_board}></BoardGenerator>
      </div>
    </div>
  )
}


function BoardGenerator({board}) {
    let iterator = 0;
    let pass = 0;
  return (
    <div className="container">
      {
        board.map(rows=>
          {
            let row = [];
      
            rows.map(box=>
            {
              if(iterator%2==0)
              {
                row.push(<img id = {box} src="/src/assets/Green_box.png"></img>);
              }
              else
              {
                row.push(<img id = {box} src="/src/assets/White_box.png"></img>);
              }
              iterator++
            })
            pass++;
            if(pass%2==0){iterator=0;}
            else{iterator=1;}
            return row;
          })
      }
    </div>
  );
}

export default App
