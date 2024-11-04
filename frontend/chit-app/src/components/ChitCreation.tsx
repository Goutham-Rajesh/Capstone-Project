import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ChitFund {
    name: string;
    totalAmount: number;
    maxParticipants: number;
    duration: number;
    startDate: Date;
    CreatorID: number;
    participants: number[];
}

const ChitFundForm: React.FC = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState<ChitFund>({
        name: '',
        totalAmount:0,
        maxParticipants: 0,
        duration:0,
        startDate: new Date(),
        CreatorID: Number(sessionStorage.getItem('userId')),
        participants: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'totalAmount' || name === 'maxParticipants' ? Number(value) : value,
        });
    };
 
    

    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/createChitFund',{
                name: formData.name,
    totalAmount:formData.totalAmount,
    maxParticipants:formData.duration,
    duration:formData.duration,
    startDate:formData.startDate,
    CreatorID:sessionStorage.getItem("userId"),
    Participants:formData.participants


            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Chit Fund created:', response.data);
        } catch (error) {
            console.error('Error creating Chit Fund:', error);
        }
        navigate('/ChitCreator');
    };

    return (


<div className="container-fluid px-1 py-5 mx-auto" style={{ maxWidth: '600px' }}>
    <div className="row d-flex justify-content-center">
        <div className="col-12 text-center">
            {/* <h3 className="mb-4">Create a Chit Fund</h3> */}
            <h3 
    className="mb-4 fw-bold" 
    style={{
        fontSize: '2rem',
        background: 'linear-gradient(to right, #4a90e2, #1c75bc)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'inline-block'
    }}
>
    Create a Chit Fund
</h3>

            <div className="card p-4" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <form className="form-card" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label fw-bold">Name<span className="text-danger"> *</span></label>
                        <input type="text" className="form-control rounded-pill" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalAmount" className="form-label fw-bold">Total Amount<span className="text-danger"> *</span></label>
                        <input type="number" className="form-control rounded-pill" id="totalAmount"  name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="form-label fw-bold">Duration<span className="text-danger"> *</span></label>
                        <input type="number" className="form-control rounded-pill" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="form-label fw-bold">Start Date<span className="text-danger"> *</span></label>
                        <input type="date" className="form-control rounded-pill" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary rounded-pill w-100" style={{ fontSize: '1.1rem' }}>Create Chit Fund</button>
                </form>
            </div>
        </div>
    </div>
</div>


    );
};

export default ChitFundForm;
