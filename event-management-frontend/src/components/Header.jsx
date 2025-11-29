import { useState } from "react";
import {  useSelector } from "react-redux";

import ProfilesList from "./ProfilesList";

export default function Header(){
    
    const [profilesListVisible, setProfilesListVisible] = useState(false);
    const {currentProfile} = useSelector(store => store.profiles);

    const toggleProfilesListVisibility = ()=>{
        setProfilesListVisible(isVisibile => {
            if(!isVisibile) return true;
            return false;
        });
    };

    return(
        <div id="container-header">
            <div>
                <h1>Event Management</h1>
                <p>Create and manage events across multiple timezones</p>
            </div>
            <div style={{position:"relative", height: "42px", width: "200px"}}>
                <button
                    id="profile-btn"
                    onClick={toggleProfilesListVisibility}
                >
                    {currentProfile ? currentProfile.name : "Select current profile"}
                </button>
                <ProfilesList
                    isVisible={profilesListVisible}
                    setIsVisible={setProfilesListVisible}
                    originId="profile-btn"
                />
            </div>
        </div>
    );
}