import React from 'react'
import Navbar from '../components/NavBar'
import ChitFundForm from '../components/ChitCreation'

const CreateChit = () =>{
    return (
        <>
            <Navbar pages={['Home', 'Create Chit', 'Active Chit', 'About']} />
            <h1>Welcome to Create Chit page</h1>
            <ChitFundForm/>
        </>
    )
}

export default CreateChit