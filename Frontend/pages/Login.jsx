import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import config from "../config";

export const Login = () => {
  const navigate=useNavigate();
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const changeemail=(e)=>{
    setemail(e.target.value);
  }
  const changepassword=(e)=>{
    setpassword(e.target.value);
  }
  const loginfunction=async()=>{
   try{
    const response=await axios.post(`${config.API_URL}/auth/login`,{
        email:email,
        password:password
    });
    if(response.status===200){
      localStorage.setItem("name",response.data.user.firstName);
      localStorage.setItem("token",response.data.token);
      navigate("/dashboard");
    }
    if(response.status===411){
      toast.error(response.data.message);
   }
  }
  catch(err){
      toast.error("An unexpected error occurred.");
   }
  }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Log in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={changeemail} placeholder="pathi@gmail.com" label={"Email"} />
        <InputBox  onChange={changepassword} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={loginfunction} label={"Log in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
      </div>
    </div>
    <Toaster/>
  </div>
}