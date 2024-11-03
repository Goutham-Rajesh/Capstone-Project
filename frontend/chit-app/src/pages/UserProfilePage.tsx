import ResponsiveAppBar from "../components/NavBar";
import UserProfileComponent from "../components/UserProfileComponent";

function UserProfile(){
    return(
        <div>
            <ResponsiveAppBar pages={['Home', 'Chit Groups', 'About']}/>
            <UserProfileComponent/>
        </div>
    )
}

export default UserProfile;