import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import EventForm from "./EventForm";
import ModalSlice from "../redux/ModalSlice";
import LogsDisplay from "./LogsDisplay";
import { convertAndFormatDay, formatDay } from "../utilities/utils";

export default function EventDisplay({ eventObj }) {
    const { viewingTimezone } = useSelector(store => store.events);
    const { startDate, startTime, endDate, endTime, timezone, createdAt, updatedAt } = eventObj;
    const dispatch = useDispatch();
    const {setEditFormModalVisible, setLogsModalVisible} = ModalSlice.actions;

    const handleEditBtnClick = () => {
        dispatch(setEditFormModalVisible(true));
    }

    const handleLogsBtnClick = () => {
        dispatch(setLogsModalVisible(true));
    }

    return (
        <>
            <div className="event-box">
                <p>👤 {eventObj.profiles.map(profile => profile.name).join(", ")}</p>
                <p><span>Start: </span>{convertAndFormatDay(startDate, startTime, timezone, viewingTimezone)}</p>
                <p><span>End: </span>{convertAndFormatDay(endDate, endTime, timezone, viewingTimezone)}</p>
                <p><span>Created at: </span>{formatDay(createdAt, viewingTimezone)}</p>
                <p><span>Updated at: </span>{formatDay(updatedAt, viewingTimezone)}</p>
                <div>
                    <button onClick={handleEditBtnClick}>Edit</button>
                    <button onClick={handleLogsBtnClick}>View Logs</button>
                </div>
            </div>
            <Modal closeOnClickOutside={false} noBackground={false} stateToUse="form">
                <EventForm mode="EDIT" prefilledFormData={eventObj}/>
            </Modal>
            <Modal closeOnClickOutside={true} noBackground={false} stateToUse="logs">
                <LogsDisplay eventObj={eventObj} />
            </Modal>
        </>
    );
}