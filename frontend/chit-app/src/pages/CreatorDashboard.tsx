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
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/user/${sessionStorage.getItem('userId')}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        setUser(response.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar pages={['Active Chit', 'Create Chit', 'Creator Profile', 'About']} isLoggedIn={true} />
            {user ? (
                <h1
                    className="text-center mb-4"
                    style={{
                        fontWeight: 'bold',      // Makes the text bold
                        color: '#4B0082',        // Indigo color for a rich look
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',  // Adds a slight shadow for depth
                        letterSpacing: '1px',    // Adds spacing between letters
                        fontSize: '2.5rem'       // Increases font size for impact
                    }}
                >
                    Welcome {user.name}
                </h1>
            ) : (
                <h1 className="text-center">Loading...</h1>
            )}
            <CreatorChitFundCard />
        </div>
    );
}

export default CreatorDashboard;
