import { useDispatch, useSelector } from "react-redux";
import ProfilesList from "./ProfilesList";
import Modal from "./Modal";
import ModalSlice from "../redux/ModalSlice";
import { useEffect, useRef, useState } from "react";

export default function Header(){
    const {currentProfile} = useSelector(store => store.profiles);
    const setProfileListModalVisible = ModalSlice.actions.setProfileListModalVisible;
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    const [stylingForProfileList, setStylingForProfileList] = useState({});

    useEffect(()=>{
        setStylingForProfileList({
            position:"absolute",
            top: buttonRef.current.getBoundingClientRect().bottom,
            left: buttonRef.current.getBoundingClientRect().left,
        });
    }, []);

    return(
        <div id="container-header">
            <div>
                <h1>Event Management</h1>
                <p>Create and manage events across multiple timezones</p>
            </div>
            <button
                id="profile-btn"
                onClick={()=>{dispatch(setProfileListModalVisible(true))}}
                style={{width: "200px"}}
                ref={buttonRef}
            >
                {currentProfile ? currentProfile.name : "Select current profile"}
            </button>
            <Modal stateToUse="profiles" noBackground={true} closeOnClickOutside={true} styling={stylingForProfileList}>
                <ProfilesList/>
            </Modal>
        </div>
    );
}