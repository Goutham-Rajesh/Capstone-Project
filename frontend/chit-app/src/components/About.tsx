import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About: React.FC = () => {
    return (
        <div className="container" style={{ padding: '60px 0' }}>
            <h2 className="text-center mb-4">About Us</h2>
            <p>
                chitLink was developed by trainees Goutham and Gururaj as part of their capstone project. 
                This project addresses a significant issue faced by certain communities that rely on traditional 
                savings schemes, such as collective savings and borrowing groups.
            </p>
            <p>
                These traditional schemes often suffer from a lack of transparency and organization. Participants 
                frequently have little to no visibility into the group's financial status, and organizers find it 
                challenging to manage multiple groups effectively. 
            </p>
            <p>
                There is a clear need for a secure platform that can automate the management of participants, 
                handle fund allocations, and ensure a clear and transparent process for everyone involved.
            </p>
            <h3 className="mt-5">Vision</h3>
            <p>
                To remain customer-focused by constantly providing tangible and measurable value for money 
                in terms of products and services.
            </p>
            <h3 className="mt-4">Mission</h3>
            <p>
                To look forward and adapt to the times, offering consumers the best quality at the most 
                affordable price.
            </p>
        </div>
    );
};

export default About;
