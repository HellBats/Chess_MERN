export async function Signup ({name,username,email,password})
{
    const response = fetch('https://back.zoanfruit.xyz/api/v1/user/sign-up',
    {
        method:"POST",
        body:{Name:name,UserName:username,EmailId:email,Password:password}
    });
    const json = (await response).json();
    if(!json.token) console.log(json.message);
}

export function Login_({username,password})
{
    console.log(username,password);
}
