import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalSlice from "../redux/ModalSlice";

export default function Modal({children, stateToUse, closeOnClickOutside=true, noBackground=false, styling={}}){
    const modalRef = useRef(null);
    const modalSliceState = useSelector(store => store.modal);
    const dispatch = useDispatch();

    let modalVisible, setModalVisible;
    switch (stateToUse){
        case "profiles":
            modalVisible = modalSliceState.profileListModalVisible;
            setModalVisible = ModalSlice.actions.setProfileListModalVisible;
            break;
        case "logs":
            modalVisible = modalSliceState.logsModalVisible;
            setModalVisible = ModalSlice.actions.setLogsModalVisible;
            break;
        case "form":
            modalVisible = modalSliceState.editFormModalVisible;
            setModalVisible = ModalSlice.actions.setEditFormModalVisible;
            break;
    }

    if(!modalVisible)
        return "";
    return (
        <div
            id="modal-bg"
            style={{backgroundColor: noBackground ? "none" : "rgba(0, 0, 0, 0.16)"}}
            onClick={event => {
            if (!closeOnClickOutside || modalRef.current.contains(event.target)) 
                return;
            dispatch(setModalVisible(false));
          }}    
        >
            <div
                id="modal-container"
                ref={modalRef}
                style={styling}
            >
                {children}
            </div>
        </div>
    );
}