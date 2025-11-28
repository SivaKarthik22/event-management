import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../redux/ProfileSlice";

export default function Header(){
    const {allProfiles} = useSelector(store => store.profiles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfiles());
    },[]);

    return(
        <div id="container-header">
            <div>
                <h1>Event Management</h1>
                <p>Create and manage events across multiple timezones</p>
            </div>
            <div>
                <button id="profile-btn">Select current profile</button>
            </div>
        </div>
    );
}