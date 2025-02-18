import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import config from "../config";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export const Dashboard = () => {
    const [balance,setbalance]=useState(0);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchBalance = async () => {
            const response = await axios.get(`${config.API_URL}/user/balance`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.status === 200) {
                setbalance(response.data.balance);
            }
            if(response.status === 401) {
                toast.error(response.data.message);
                toast.error("Please login again");
            }
        };
        fetchBalance();
    }, []);
    return <div>
        <Appbar />
        <div className="m-8">
            <div className="flex items-center gap-4">
                <Balance value={balance} />
                <button 
                    onClick={() => navigate("/add-money")}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                    Add Money
                </button>
            </div>
            <h2 className="text-3xl font-bold mt-8 mb-4">Transfer Money</h2>
            <Users/>
        </div>
        <Toaster />
    </div>
}
