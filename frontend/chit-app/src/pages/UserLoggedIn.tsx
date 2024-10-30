import NavBar from "../components/NavBar";
import UserChitFund from "../components/UserChitFund";

function UserLoggedIn(){
    return(
        <div>
            <NavBar pages={['Home', 'Chit Groups', 'About']}/>
            <UserChitFund/>
        </div>
    )
}

export default UserLoggedIn;