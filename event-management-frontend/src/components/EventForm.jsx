import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultTimeZone, timezones } from "../utilities/timezones";
import ToastSlice from "../redux/ToastSlice";
import dayjs from "dayjs";
import { createEvent, updateEvent } from "../services/eventServices";
import { getEvents } from "../redux/EventSlice";
import ModalSlice from "../redux/ModalSlice";

export default function EventForm({ mode = "CREATE", prefilledFormData = null }) {
    const { updateToast } = ToastSlice.actions;
    const dispatch = useDispatch();
    const { allProfiles, currentProfile } = useSelector(store => store.profiles);
    const [formData, setFormData] = useState({
        "timezone": defaultTimeZone,
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": ""
    });
    const [formProfileData, setFormProfileData] = useState({});
    const { setEditFormModalVisible } = ModalSlice.actions;

    useEffect(() => {
        if (mode != "EDIT" || !prefilledFormData)
            return;
        setFormData({
            "timezone": prefilledFormData.timezone,
            "startDate": prefilledFormData.startDate,
            "startTime": prefilledFormData.startTime,
            "endDate": prefilledFormData.endDate,
            "endTime": prefilledFormData.endTime
        });
        const profileData = {};
        prefilledFormData.profiles.forEach(profile => {
            profileData[profile._id] = true
        });
        setFormProfileData(profileData);
    }, []);

    async function handleSubmit(event) {
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

        let responseData
        if (mode != "EDIT")
            responseData = await createEvent({ ...formData, profiles: getSelectedProfiles() });
        else
            responseData = await updateEvent({ ...formData, _id: prefilledFormData._id, profiles: getSelectedProfiles() });

        if (responseData.success) {
            setFormData({
                "timezone": defaultTimeZone,
                "startDate": "",
                "startTime": "",
                "endDate": "",
                "endTime": ""
            });
            setFormProfileData({});
            dispatch(updateToast({
                toastType: "success",
                toastTitle: "Success",
                toastContent: responseData.message,
                toastIsVisible: true,
            }));
            dispatch(getEvents(currentProfile._id));

            if (mode == "EDIT")
                dispatch(setEditFormModalVisible(false));
        }
        else {
            dispatch(updateToast({
                toastType: "error",
                toastTitle: "Error",
                toastContent: responseData.message,
                toastIsVisible: true,
            }));
        }
    };

    const getSelectedProfiles = () => {
        return Object.keys(formProfileData).filter(key => formProfileData[key]);
    }

    function validateForm() {
        const selectedProfiles = getSelectedProfiles();
        let message = "OK";
        if (!formData.timezone || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime)
            message = "*Fill all the fields to proceed."
        else if (selectedProfiles.length == 0)
            message = "*Choose one or more profiles to proceed."
        else {
            const startDay = dayjs(`${formData.startDate} ${formData.startTime}`);
            const endDay = dayjs(`${formData.endDate} ${formData.endTime}`);
            if (endDay.isBefore(startDay))
                message = "*End date and time should be later than Start date and time. "
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
        <div className={`template-box content-box ${mode == "EDIT" ? "edit-box" : ""}`}>
            <h3>{mode == "EDIT" ? "Edit Event" : "Create Event"}</h3>
            <form>
                <div className="form-ele-div">
                    <label className="medium-weight" htmlFor="profiles">Profiles</label>
                    <p style={{ lineHeight: 0.5 }} className="small-size">{displaySelectedProfilesCount()}</p>
                    <div className="scrollable input-fields" id="profile-selection-container">
                        {allProfiles.map((profile, idx) => <div className="profile-selection-unit" key={idx}>
                            <input type="checkbox" id={profile._id} checked={formProfileData[profile._id] ?? false} onChange={handleProfilesSelection} />
                            <label >{profile.name}</label>
                        </div>)}
                    </div>
                </div>

                <div className="form-ele-div">
                    <label className="medium-weight" htmlFor="timezone">Timezone</label>
                    <select id="timezone" className="input-fields" onChange={handleChange} value={formData.timezone}>
                        {timezones.map((timezone, idx) => <option value={timezone} key={idx}>{timezone}</option>)}
                    </select>
                </div>

                <div className="form-ele-div">
                    <label className="medium-weight" htmlFor="start">Start Date and Time</label>
                    <div className="date-parent-container">
                        <input type="date" id="startDate" className="input-fields" onChange={handleChange} value={formData.startDate} style={{flex:0.8}}/>
                        <input type="time" id="startTime" className="input-fields" onChange={handleChange} value={formData.startTime} style={{flex:0.2}}/>
                    </div>
                </div>

                <div className="form-ele-div">
                    <label className="medium-weight" htmlFor="end">End Date and Time</label>
                    <div className="date-parent-container">
                        <input type="date" id="endDate" className="input-fields" onChange={handleChange} value={formData.endDate} style={{flex:0.8}}/>
                        <input type="time" id="endTime" className="input-fields" onChange={handleChange} value={formData.endTime} style={{flex:0.2}}/>
                    </div>
                </div>
            </form>
            {mode != "EDIT" ?
                <button id="form-submit" className="blue-btn" onClick={handleSubmit}>+ Create Event</button>
                :
                <div id="form-submit-edit">
                    <button onClick={() => dispatch(setEditFormModalVisible(false))}>Cancel</button>
                    <button className="blue-btn" onClick={handleSubmit}>Update Event</button>
                </div>
            }
        </div>
    );
}