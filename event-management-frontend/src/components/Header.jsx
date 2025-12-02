import { useDispatch, useSelector } from "react-redux";
import ProfilesList from "./ProfilesList";
import Modal from "./Modal";
import ModalSlice from "../redux/ModalSlice";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const { currentProfile } = useSelector(store => store.profiles);
    const { setProfileListModalVisible } = ModalSlice.actions;
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    const [stylingForProfileList, setStylingForProfileList] = useState({});

    const calculatePositionForProfileList = () => {
        setStylingForProfileList({
            position: "absolute",
            top: buttonRef.current.getBoundingClientRect().bottom + 5,
            left: buttonRef.current.getBoundingClientRect().left,
        });
    }

    useEffect(() => {
        calculatePositionForProfileList();
        window.addEventListener('resize', calculatePositionForProfileList);

        return () => {
            window.removeEventListener('resize', calculatePositionForProfileList);
        };
    }, []);

    return (
        <div id="container-header">
            <div>
                <h2>Event Management</h2>
                <p className="small-size" style={{marginTop:0}}>Create and manage events across multiple timezones</p>
            </div>
            <button
                id="profile-btn"
                onClick={() => { dispatch(setProfileListModalVisible(true)) }}
                ref={buttonRef}
            >
                {currentProfile ? currentProfile.name : "Select current profile"}
            </button>
            <Modal stateToUse="profiles" noBackground={true} closeOnClickOutside={true} styling={stylingForProfileList}>
                <ProfilesList />
            </Modal>
        </div>
    );
}