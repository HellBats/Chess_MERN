import { useRecoilState } from "recoil"
import { show_password,Username,Password } from "../Store/Atoms/UtilityAtoms"
import ShowPassword from "../Components/ShowPassword";
import { Login_ } from "../Functions/SendData";

export default function Login()
{
    const [username,setUsername] = useRecoilState(Username);
    const [password,setPassword] = useRecoilState(Password);
    const [show_passwords,set_show_password]= useRecoilState(show_password);

    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    return <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-60 bg-white w-80 rounded-md text-white font-bold">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 w-80 h-12 text-center rounded-t-md">Login</div>
            <div className="flex flex-col justify-center ml-4 mt-6">
                    <input type="text" placeholder='Email ID/username' className="w-60 text-slate-400 border-b border-slate-400
                     focus:outline-none focus:border-slate-600" onChange={handleUsername}></input>
            </div>
            <div className="flex flex-col justify-center ml-4 mt-2 mb-3">
                    <div className="flex">
                    <input type={show_passwords?'text':'password'} placeholder='Password' className="w-56 text-slate-400 
                    border-b border-slate-400 focus:outline-none focus:border-slate-600" onChange={handlePassword}></input>
                    <ShowPassword show_passwords={show_passwords} set_show_password={set_show_password}></ShowPassword>
                </div>
            </div>
            <div className="font-bold text-white ml-20 mt-4 bg-gradient-to-r 
            from-red-500 to-orange-500 p-1 md:px-2 md:mb-2 rounded-md w-32" 
            onClick={()=>Login_({username,password})}>Submit</div>
        </div>
    </div>
}