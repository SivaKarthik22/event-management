import { timezones } from "../constants/timeZones";
import { useDispatch, useSelector } from "react-redux";
import EventDisplay from "./EventDisplay";
import EventSlice from "../redux/EventSlice";

export default function MyEvents() {
    const {eventsOfProfile, viewingTimezone} = useSelector(store => store.events);
    const setViewingTimezone = EventSlice.actions.setViewingTimezone;
    const dispatch = useDispatch();

    const handleTimezoneChange = (event)=>{
        dispatch(setViewingTimezone(event.target.value));
    }

    return (
        <div className="content-box">
            <h3>Events</h3>
            <div className="form-ele-div">
                <label htmlFor="timezone">View in Timezone</label>
                <select id="timezone" onChange={handleTimezoneChange} value={viewingTimezone}>
                    {timezones.map((timezone, idx) => <option value={timezone} key={idx}>{timezone}</option>)}
                </select>
            </div>
            <div>
                {eventsOfProfile.map((eventObj,idx)=><EventDisplay key={idx} eventObj={eventObj}/>)}
            </div>
        </div>
    );
}