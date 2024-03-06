export default function Piece({src,row_,column,position})
  {
    //This is the Piece Component that renders according to position state
    const pieceType = position[row_ - 1][column - 1][0];
    if (pieceType !== 'tr' && pieceType !== undefined) {
      return (
        <img
          className="piece"
          src={src}
          style={{
            gridRow: position[row_ - 1][column - 1][1],
            gridColumn: position[row_ - 1][column - 1][2],
          }}
        />
      );
    } else {
      return null; // or render an empty component, depending on your preference
    }
  }