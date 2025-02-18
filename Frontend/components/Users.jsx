import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { toast } from "react-hot-toast";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${config.API_URL}/user/bulk/${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                if (response.data.user) {
                    setUsers(response.data.user);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                toast.error("Failed to fetch users");
                setUsers([]);
            }
        };
        fetchUsers();
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
                onChange={(e) => setFilter(e.target.value)}
                type="text" 
                placeholder="Search users..." 
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>
        {users.length > 0 && <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>}
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button 
                onClick={() => navigate(`/send/${user._id}/${user.firstName}`)}
                label="Send Money" 
            />
        </div>
    </div>
}