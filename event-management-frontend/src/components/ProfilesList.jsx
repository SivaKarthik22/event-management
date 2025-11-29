import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileSlice, { getProfiles } from "../redux/ProfileSlice";
import { createProfile } from "../services/profileServices";
import ToastSlice from "../redux/ToastSlice";

export default function ProfilesList({ isVisible, setIsVisible, originId }) {
    const { allProfiles, currentProfile } = useSelector(store => store.profiles);
    // const thisRef = useRef(null);
    const setCurrentProfile = ProfileSlice.actions.setCurrentProfile;
    const updateToast = ToastSlice.actions.updateToast;
    const dispatch = useDispatch();
    const [newProfileName, setNewProfileName] = useState("");
    const [showProfileNameInput, setShowProfileNameInput] = useState(false);

    useEffect(()=>{
        setNewProfileName("");
        setShowProfileNameInput(false);
    }, [isVisible]);

    /* useEffect(() => {
        if (!isVisible)
            return;
        thisRef.current.focus();
        console.log(thisRef.current);
    }); */

    /* const handleBlur = event => {
        if (event.relatedTarget && event.relatedTarget.id == originId)
            return;
        setIsVisible(false);
        console.log(event);
    } */

    async function handleAddProfileBtnClick(){
        const name = newProfileName.trim();
        if(name == ""){
            setNewProfileName("");
            return;
        }
        const responseData = await createProfile({name: name});
        if(responseData.success){
            setShowProfileNameInput(false);
            dispatch(getProfiles());
        }
        else{
            dispatch(updateToast({
                toastType: "error",
                toastTitle: "Error",
                toastContent: responseData.message,
                toastIsVisible: true,
            }));
        }
        setNewProfileName("");
    }

    if (!isVisible)
        return "";
    return (
        <div
            id="profiles-list-container"
            //onBlur={handleBlur}
            // ref={thisRef}
            tabIndex="0"
        >
            {allProfiles.length == 0 ?
                <p>No profiles found</p> :
                <ul>
                    {allProfiles.map((profile, idx) => <li key={idx}>
                        <button
                            onClick={() => {
                                dispatch(setCurrentProfile(profile));
                                setIsVisible(false);
                            }}
                            className={`${(currentProfile && profile._id == currentProfile._id) ? "selected " : ""}profile-list-item`}
                        >
                            {(currentProfile && profile._id == currentProfile._id) ? "✔ " : ""}
                            {profile.name}
                        </button>
                    </li>)}
                </ul>
            }
            <div style={{ display: "flex", gap: "5px"}}>
                {showProfileNameInput ? <>
                    <input type="text" id="profile-name-field" onChange={event => { setNewProfileName(event.target.value) }} value={newProfileName} />
                    <button id="add-profile-btn" onClick={handleAddProfileBtnClick}>Add</button>
                </> :
                    <button onClick={()=>{setShowProfileNameInput(true)}}>+ Add New Profile</button>
                }

            </div>
        </div>
    );
}