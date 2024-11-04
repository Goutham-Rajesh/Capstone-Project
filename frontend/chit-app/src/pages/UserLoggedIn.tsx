import NavBar from "../components/NavBar";
import UserChitFund from "../components/UserChitFund";

function UserLoggedIn(){
    return(
        <div>
            <NavBar pages={['Home', 'Chit Group', 'About']} isLoggedIn={true}/>
            <UserChitFund/>
        </div>
    )
}

export default UserLoggedIn;