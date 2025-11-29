import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timezones } from "../constants/timeZones";
import ToastSlice from "../redux/ToastSlice";
import dayjs from "dayjs";

export default function EventForm() {
    const updateToast = ToastSlice.actions.updateToast;
    const dispatch = useDispatch();
    const { allProfiles } = useSelector(store => store.profiles);
    const [formData, setFormData] = useState({
        "timezone": "UTC",
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": ""
    });
    const [formProfileData, setFormProfileData] = useState({});

    const handleSubmit = event => {
        event.preventDefault();
        const validationResult = validateForm();
        if (validationResult != "OK") {
            dispatch(updateToast({
                toastType: "warning",
                toastTitle: "Warning",
                toastContent: validationResult,
                toastIsVisible: true,
            }));
            return;
        }
        //make api call
        console.log(formData);
    };

    const getSelectedProfiles = () => {
        return Object.keys(formProfileData).filter(key => formProfileData[key]);
    }

    function validateForm() {
        const selectedProfiles = getSelectedProfiles();
        let message = "OK";
        if (selectedProfiles.length == 0 || !formData.timezone || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime)
            message = "*Fill all the fields to proceed."
        else {
            const startDay = dayjs(`${formData.startDate} ${formData.startTime}`);
            const endDay = dayjs(`${formData.endDate} ${formData.endTime}`);
            if (endDay.isBefore(startDay)) 
                message = "End date and time should be later than Start date and time. "
        }
        return message;
    }

    const handleChange = event => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const handleProfilesSelection = event => {
        setFormProfileData({ ...formProfileData, [event.target.id]: event.target.checked });
    }

    const displaySelectedProfilesCount = () => {
        const count = Object.values(formProfileData).filter(value => value).length;
        return `${count} profile${count > 1 ? "s" : ""} selected`;
    }

    return (
        <div className="content-box">
            <h3>Create Event</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-ele-div">
                    <label htmlFor="profiles">Profiles</label>
                    <p>{displaySelectedProfilesCount()}</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {allProfiles.map((profile, idx) => <div key={idx}>
                            <label>{profile.name}</label>
                            <input type="checkbox" id={profile._id} checked={formProfileData[profile._id] ?? false} onChange={handleProfilesSelection} />
                        </div>)}
                    </div>
                </div>

                <div className="form-ele-div">
                    <label htmlFor="timezone">Timezone</label>
                    <select id="timezone" onChange={handleChange} value={formData.timezone}>
                        {timezones.map((timezone, idx) => <option value={timezone} key={idx}>{timezone}</option>)}
                    </select>
                </div>

                <div className="form-ele-div">
                    <label htmlFor="start">Start Date and Time</label>
                    <input type="date" id="startDate" onChange={handleChange} value={formData.startDate} />
                    <input type="time" id="startTime" onChange={handleChange} value={formData.startTime} />
                </div>

                <div className="form-ele-div">
                    <label htmlFor="end">End Date and Time</label>
                    <input type="date" id="endDate" onChange={handleChange} value={formData.endDate} />
                    <input type="time" id="endTime" onChange={handleChange} value={formData.endTime} />
                </div>

                <button id="form-submit" type="submit">+ Create Event</button>
            </form>
        </div>
    );
}