import {BishopMoves, KingMoves, KnightMoves, PawnMoves, QueenMoves, RookMoves} from "./SimulateMoves";


export default function CheckMate({position,color})
{
    const piece_color = color?'w':'b';
    const pieces_cords = FindPieces(position,piece_color);
    return PieceValidMoves(position,pieces_cords,piece_color,color);

}

function FindPieces(position,piece_color)
{
    let pieces_cords = [];
    for(let i=0;i<8;i++)
    {
        for(let j=0;j<8;j++)
        {
            if(position[i][j][0][0] == piece_color)
            {
                pieces_cords.push(position[i][j]);
            }
        }
    }
    return pieces_cords;
}

function PieceValidMoves(position, pieces_cords, piece_color, color) {
    for (let piece of pieces_cords) {
        let rank = piece[1];
        let file = piece[2];
        if (piece[0] == piece_color + 'p') {
            if (PawnMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
        else if (piece[0] == piece_color + 'n') {
            if (KnightMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
        else if (piece[0] == piece_color + 'b') {
            if (BishopMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
        else if (piece[0] == piece_color + 'r') {
            if (RookMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
        else if (piece[0] == piece_color + 'q') {
            if (QueenMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
        else if (piece[0] == piece_color + 'k') {
            if (KingMoves({ position, rank, file, color })) {
                console.log("true");
                return true;
            }
        }
    }
    return false; // Return false if no valid moves found
}