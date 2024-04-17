
import { Promotion } from "../../Functions/Promotion";
import { useRecoilValue,useSetRecoilState, useRecoilState } from "recoil";
import { pawnform,turn,promotions,Id} from "../../Store/Atoms/UtilityAtoms";
import { positions,pawn_cords} from "../../Store/Atoms/PositionsAndCordsAtoms";

export default function PawnPromotion()
{
    const setPawnsForms = useSetRecoilState(pawnform);
    const setPromotion = useSetRecoilState(promotions);
    const id = useRecoilValue(Id);
    const [pawn_cord,setPawnCords] = useRecoilState(pawn_cords);
    const [position,setPosition] = useRecoilState(positions);
    const setTurn = useSetRecoilState(turn);
    const pawnforms = useRecoilValue(pawnform);
    return(
        <div className="md:w-16 ">
        {pawnforms.map(pawns =>
        {  
          return <img src={'src/assets/'+pawns+'.png'} key={pawns} onClick={()=>Promotion({pawns,
          setTurn,position,setPosition,pawn_cord,setPawnCords,setPawnsForms,setPromotion,id})}></img>
        })}
    </div>
    )
}