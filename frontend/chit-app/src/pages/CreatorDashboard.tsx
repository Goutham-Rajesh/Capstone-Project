import axios from "axios";
import Navbar from "../components/NavBar";
import { useEffect, useState } from "react";

function CreatorDashboard() {
    interface User {
        userId?: number;
        name: string;
        email: string;
        phone: string;
        address?: string;
        password: string;
        role: 'Admin' | 'Chit Creator' | 'Participant';
    }

    const [user, setUser] = useState<User | null>(null);
    const fetchUser = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/auth/user/${localStorage.getItem('userId')}`);
        setUser(response.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar pages={['Home', 'Create Chit', 'Active Chit', 'About']} />
            {user ? <h1>Welcome {user.name}</h1> : <h1>Loading...</h1>}
            <h2>Creator Dashboard</h2>
            
        </div>
    )
}

export default CreatorDashboard;