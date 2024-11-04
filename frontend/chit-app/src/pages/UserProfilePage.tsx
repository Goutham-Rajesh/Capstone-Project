import ResponsiveAppBar from "../components/NavBar";
import UserProfileComponent from "../components/UserProfileComponent";

function UserProfile(){
    return(
        <div>
            <ResponsiveAppBar pages={['Chit Group','Profile','About']} isLoggedIn={true}/>
            <UserProfileComponent/>
        </div>
    )
}

export default UserProfile;