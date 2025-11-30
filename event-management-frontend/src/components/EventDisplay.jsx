import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Modal from "./Modal";
import EventForm from "./EventForm";
import ModalSlice from "../redux/ModalSlice";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EventDisplay({ eventObj }) {
    const { viewingTimezone } = useSelector(store => store.events);
    const { startDate, startTime, endDate, endTime, timezone, createdAt, updatedAt } = eventObj;
    const dispatch = useDispatch();
    const setEditFormModalVisible = ModalSlice.actions.setEditFormModalVisible;

    const convertAndFormatDay = (inputDate, inputTime, fromTimezone, toTimezone) => {
        const day = dayjs(`${inputDate} ${inputTime}`);
        console.log(day);
        const inputDay = dayjs.tz(day, fromTimezone);
        console.log(inputDay);
        const convertedDay = inputDay.tz(toTimezone);
        console.log(convertedDay);
        return convertedDay.format("MMM DD, YYYY | hh:mm A");
    }
    const formatDay = (date, toTimezone) => {
        return dayjs(date).tz(toTimezone).format("MMM DD, YYYY | hh:mm A");
    }

    const handleEditBtnClick = () => {
        dispatch(setEditFormModalVisible(true));
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
                    <button>View Logs</button>
                </div>
            </div>
            <Modal closeOnClickOutside={false} noBackground={false} stateToUse="form">
                <EventForm mode="EDIT" prefilledFormData={eventObj}/>
            </Modal>
        </>
    );
}