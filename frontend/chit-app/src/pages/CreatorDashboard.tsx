import axios from "axios";
import Navbar from "../components/NavBar";
import { useEffect, useState } from "react";
import CreatorChitFundCard from "../components/CreatorChitFundCard";

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
        const token =sessionStorage.getItem('token')
        const response = await axios.get(`http://127.0.0.1:5000/user/${sessionStorage.getItem('userId')}`,{
            headers: {
                
               ' Authorization': `Bearer ${token}`,
                
            'Content-Type':'application/json'
                 // Set the token in the Authorization header
            },
        });
        setUser(response.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar pages={['Active Chit','Create Chit','Profile','About']} isLoggedIn={true} />
            {user ? <h1>Welcome {user.name}</h1> : <h1>Loading...</h1>}
            <CreatorChitFundCard/>
            
        </div>
    )
}

export default CreatorDashboard;