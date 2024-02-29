import { useState } from "react";

export default function BoardGenerator({board}) {
    const PieceFunction = ()=>{console.log("Lund")};
    let pieces = ['br','bn','bb','bq','bk','bb','bn','br'
                  ,'bp','bp','bp','bp','bp','bp','bp','bp'
                  ,'wp','wp','wp','wp','wp','wp','wp','wp'
                  ,'wr','wn','wb','wq','wk','wb','wn','wr'];
    let iterator = 0;
    let pass = 0;
    return (
      <div className="container">
         {board.map(row=>
            row.map((box)=>
              {
                if(pass<2)
                {
                  let src = "src/assets/"+pieces[pass*8+iterator]+".png";
                  let row_ = pass+1;
                  let column = iterator+1;
                  iterator++;
                  if(iterator==8)
                  {
                    iterator = 0;
                    pass++;
                  }
                  return <Piece key={box[0]} src={src} row_={row_} column={column}></Piece>
                }
                else if(pass<6)
                {
                  let row_ = pass+1;
                  let column = iterator+1;
                  iterator++;
                  if(iterator==8)
                  {
                    iterator = 0;
                    pass++
                  }
                  return <img key={box[0]} className="empty" 
                  style={{gridRow:row_,gridColumn:column}} onClick={()=>PieceFunction()}/>;
                }
                else
                {
                  let src = "src/assets/"+pieces[(pass-4)*8+iterator]+".png";
                  let row_ = pass+1;
                  let column = iterator+1;
                  iterator++;
                  if(iterator==8)
                  {
                    iterator = 0;
                    pass++
                  }
                  return <Piece key={box[0]} src={src} row_={row_} column={column}></Piece>
                }
              }
            )
        )
            }
        
      </div>
    );
  }

const Piece = ({src,row_,column})=>
  {
    const [position,setPosition] = useState([row_,column]);
    const Move = (row_,column)=>{
        setPosition([row_,column]);
    };

    return (
    <>
    <img className= "piece" src={src}
    style={{gridRow:position[0],gridColumn:position[1]}} onClick={()=>Move(position[0]-1,position[1])}/>
    </>
    );
  }