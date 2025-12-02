import { timezones } from "../utilities/timezones";
import { useDispatch, useSelector } from "react-redux";
import EventDisplay from "./EventDisplay";
import EventSlice from "../redux/EventSlice";

export default function MyEvents() {
    const {eventsOfProfile, viewingTimezone} = useSelector(store => store.events);
    const {setViewingTimezone} = EventSlice.actions;
    const dispatch = useDispatch();

    const handleTimezoneChange = (event)=>{
        dispatch(setViewingTimezone(event.target.value));
    }

    return (
        <div className="template-box content-box">
            <h3>Events</h3>
            <div className="form-ele-div">
                <label className="medium-weight" htmlFor="timezone">View in Timezone</label>
                <select id="timezone" className="input-fields" onChange={handleTimezoneChange} value={viewingTimezone}>
                    {timezones.map((timezone, idx) => <option value={timezone} key={idx}>{timezone}</option>)}
                </select>
            </div>
            <div className="scrollable column-flex" style={{height: "75%"}}>
                {eventsOfProfile.map((eventObj,idx)=><EventDisplay key={idx} eventObj={eventObj}/>)}
            </div>
        </div>
    );
}