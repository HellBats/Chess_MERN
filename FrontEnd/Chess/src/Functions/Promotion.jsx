import {useRecoilValue, useSetRecoilState } from "recoil";
import { Turn } from "../Functions/FirstConnection";
import {color, promotions} from "../Store/Atoms/UtilityAtoms";
import { pawnform } from "../Store/Atoms/UtilityAtoms";
import { useEffect } from "react";


export function Promotion({pawns,
  setTurn,position,setPosition,pawn_cord,setPawnCords,setPawnsForms,setPromotion,id})
  {
    const new_position = JSON.parse(JSON.stringify(position));
    new_position[pawn_cord[0]-1][pawn_cord[1]-1][0] = pawns;
    setPosition(new_position);
    setPromotion(false);
    setPawnCords([]);
    setPawnsForms([]);
    Turn({id,new_position});
    setTurn(prev=>{
      return !prev;
    }
    )
  }

  export function usePawnFroms()
  {
    const setPawnsForms = useSetRecoilState(pawnform);
    const promotion = useRecoilValue(promotions);
    const colors = useRecoilValue(color);
    useEffect(()=>
    {
      if(promotion)
      {
        const piece_color = colors?'w':'b';
        setPawnsForms([piece_color+'q',piece_color+'b',piece_color+'n',piece_color+'r'])
      }
    },[promotion]);
  }