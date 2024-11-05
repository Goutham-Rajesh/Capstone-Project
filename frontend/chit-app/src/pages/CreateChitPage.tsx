import React from 'react'
import Navbar from '../components/NavBar'
import ChitFundForm from '../components/ChitCreation'

const CreateChit = () =>{
    return (
        <>
            <Navbar pages={['Active Chit', 'Create Chit','Creator Profile','About']} isLoggedIn={true} />
            <h1>Welcome to Create Chit page</h1>
            <ChitFundForm/>
        </>
    )
}

export default CreateChit