import React, { useState } from 'react';
import axios from 'axios';

interface ChitFund {
    name: string;
    totalAmount: number;
    maxParticipants: number;
    duration: string;
    startDate: Date;
    endDate: Date;
    chitType: 'Savings' | 'Biddings';
    CreatorID: number;
    participants: number[];
}

const ChitFundForm: React.FC = () => {
    const [formData, setFormData] = useState<ChitFund>({
        name: '',
        totalAmount: 0,
        maxParticipants: 0,
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
        chitType: 'Savings', // Default type
        CreatorID: Number(localStorage.getItem('userId')) || 0, // Retrieve creator ID from localStorage
        participants: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'totalAmount' || name === 'maxParticipants' ? Number(value) : value,
        });
    };
    const token=localStorage.getItem('token')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(localStorage.getItem('token'))
        console.log(localStorage.getItem('userId'))
        try {
          
            const response = await axios.post('http://localhost:5000/chit/addChitFund', formData,
                {
                    headers: {
                        
                       ' Authorization': `Bearer ${token}`,
                        
                    'Content-Type':'application/json'
                         // Set the token in the Authorization header
                    },
                }
            );
            console.log('Chit Fund created:', response.data);
            // Optionally reset the form or show a success message
        } catch (error) {
            console.error('Error creating Chit Fund:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Total Amount:</label>
                <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
            </div>
            <div>
                <label>Max Participants:</label>
                <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} required />
            </div>
            <div>
                <label>Duration:</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" name="startDate" value={formData.startDate.toISOString().substring(0, 10)} onChange={handleChange} required />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" name="endDate" value={formData.endDate.toISOString().substring(0, 10)} onChange={handleChange} required />
            </div>
            <div>
                <label>Chit Type:</label>
                <select name="chitType" value={formData.chitType} onChange={handleChange}>
                    <option value="Savings">Savings</option>
                    <option value="Biddings">Biddings</option>
                </select>
            </div>
            <button type="submit">Create Chit Fund</button>
        </form>
    );
};

export default ChitFundForm;
