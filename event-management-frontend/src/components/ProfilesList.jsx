import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileSlice, { getProfiles } from "../redux/ProfileSlice";
import { createProfile } from "../services/profileServices";
import ToastSlice from "../redux/ToastSlice";
import { getEvents } from "../redux/EventSlice";
import ModalSlice from "../redux/ModalSlice";

export default function ProfilesList() {
    const { allProfiles, currentProfile } = useSelector(store => store.profiles);
    const {setCurrentProfile} = ProfileSlice.actions;
    const {updateToast} = ToastSlice.actions;
    const dispatch = useDispatch();
    const [newProfileName, setNewProfileName] = useState("");
    const [showProfileNameInput, setShowProfileNameInput] = useState(false);
    const {setProfileListModalVisible} = ModalSlice.actions;

    useEffect(() => {
        setNewProfileName("");
        setShowProfileNameInput(false);
    }, []);

    async function handleAddProfileBtnClick() {
        const name = newProfileName.trim();
        if (name == "") {
            setNewProfileName("");
            return;
        }
        const responseData = await createProfile({ name: name });
        if (responseData.success) {
            setShowProfileNameInput(false);
            dispatch(getProfiles());
        }
        else {
            dispatch(updateToast({
                toastType: "error",
                toastTitle: "Error",
                toastContent: responseData.message,
                toastIsVisible: true,
            }));
        }
        setNewProfileName("");
    }

    return (
        <div id="profiles-list-container" className="template-box">
            {allProfiles.length == 0 ?
                <p>No profiles found</p> :
                <ul>
                    {allProfiles.map((profile, idx) => <li key={idx}>
                        <button
                            onClick={() => {
                                dispatch(setCurrentProfile(profile));
                                dispatch(setProfileListModalVisible(false));
                                dispatch(getEvents(profile._id));
                            }}
                            className={`${(currentProfile && profile._id == currentProfile._id) ? "selected " : ""}profile-list-item`}
                        >
                            {(currentProfile && profile._id == currentProfile._id) ? "✔ " : ""}
                            {profile.name}
                        </button>
                    </li>)}
                </ul>
            }
            <div style={{ display: "flex", gap: "5px" }}>
                {showProfileNameInput ? <>
                    <input type="text" id="profile-name-field" onChange={event => { setNewProfileName(event.target.value) }} value={newProfileName} />
                    <button id="add-profile-btn" onClick={handleAddProfileBtnClick}>Add</button>
                </> :
                    <button onClick={() => { setShowProfileNameInput(true) }}>+ Add New Profile</button>
                }
            </div>
        </div>
    );
}