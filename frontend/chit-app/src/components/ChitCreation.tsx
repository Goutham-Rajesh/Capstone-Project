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
    function calculateEndDate(startDate: Date, duration: number): string {
        
        const endDate = new Date(startDate); // Create a new Date object to avoid mutating the original
        endDate.setMonth(endDate.getMonth() + duration); 
        console.log(startDate)
        console.log(endDate)// Add the duration in months
    
        return endDate.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    }
    

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
    EndDate:calculateEndDate(formData.startDate, formData.duration),
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
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                    <h3>Create a Chit Fund</h3>
                    <div className="card">
                        <form className="form-card" onSubmit={handleSubmit}>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6">
                                    <label className="form-control-label px-3">Name<span className="text-danger"> *</span></label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label className="form-control-label px-3">Total Amount<span className="text-danger"> *</span></label>
                                    <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                {/* <div className="form-group col-sm-6">
                                    <label className="form-control-label px-3">Max Participants<span className="text-danger"> *</span></label>
                                    <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} className="form-control" required />
                                </div> */}
                                <div className="form-group col-sm-6">
                                    <label className="form-control-label px-3">Duration<span className="text-danger"> *</span></label>
                                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6">
                                    <label className="form-control-label px-3">Start Date<span className="text-danger"> *</span></label>
                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="form-control" required />
                                </div>
                                </div>
                            <div className="row justify-content-end">
                                <div className="form-group col-sm-6">
                                    <button type="submit" className="btn btn-primary btn-block">Create Chit Fund</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChitFundForm;
