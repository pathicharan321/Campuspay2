import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import config from "../config";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
    const signupfunction=async()=>{
       try{
        const response = await axios.post(`${config.API_URL}/auth/signup`, {
          username,
          firstName,
          lastName,
          password
        });
        if(response.status===200){
        localStorage.setItem("name",response.data.name);
        navigate("/login");
        }
        if(response.status===411){
          toast.error(response.data.message);
        }
      }
      catch(err){
        toast.error(err.response.data.message);
      }
    }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="Pathi" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Charan" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="charan@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={signupfunction} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Log in"} to={"/login"} />
        <Toaster />
      </div>
    </div>
  </div>
}