import { useRecoilState } from "recoil"
import { Email, Name, Password, Username, show_password } from "../Store/Atoms/UtilityAtoms"
import ShowPassword from "../Components/ui/ShowPasswordEye";
import { Signup } from "../Functions/SendData";

export default function SignUp()
{
    const [show_passwords,set_show_password]= useRecoilState(show_password);
    const [name,setName] = useRecoilState(Name);
    const [username,setUsername] = useRecoilState(Username);
    const [email,setEmail] = useRecoilState(Email);
    const [password,setPassword] = useRecoilState(Password);

    const handleName = (event)=>{
        setName(event.target.value);
    }
    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }
    const handleEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    return <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-60 bg-white w-80 rounded-md text-white font-bold">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 w-80 h-12 text-center rounded-t-md">SignUp</div>
            <div className="flex flex-col justify-center ml-4 mt-6 ">
                    <input type="text" placeholder='Name' className="w-60 text-slate-400 border-b border-slate-400
                     focus:outline-none focus:border-slate-600" onChange={handleName}></input>
            </div>
            <div className="flex flex-col justify-center ml-4 mt-3 ">
                    <input type="text" placeholder='Username' className="w-60 text-slate-400 border-b border-slate-400
                     focus:outline-none focus:border-slate-600" onChange={handleUsername}></input>
                     <div className="text-xs text-red-600">Usename Should be unique</div>
            </div>
            <div className="flex flex-col justify-center ml-4 mt-2">
                    <input type="text" placeholder='Email ID' className="w-60 text-slate-400 border-b border-slate-400
                     focus:outline-none focus:border-slate-600" onChange={handleEmail}></input>
            </div>
            <div className="flex flex-col justify-center ml-4 mt-2 mb-3">
                    <div className="flex">
                    <input type={show_passwords?'text':'password'} placeholder='Password' className="w-56 text-slate-400 
                    border-b border-slate-400 focus:outline-none focus:border-slate-600"
                    onChange={handlePassword}></input>
                    <ShowPassword show_passwords={show_passwords} set_show_password={set_show_password}>
                    </ShowPassword>
                </div>
            </div>
            <div className="font-bold text-white ml-20 mt-4 bg-gradient-to-r 
            from-red-500 to-orange-500 p-1 md:px-2 md:mb-2 rounded-md w-32" onClick={()=>Signup({name,username,email,password})}>Submit</div>
        </div>
    </div>
}
