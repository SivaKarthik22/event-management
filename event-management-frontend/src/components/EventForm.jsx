import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timezones } from "../utilities/timeZones"; 
import ToastSlice from "../redux/ToastSlice";
import dayjs from "dayjs";
import { createEvent, updateEvent } from "../services/eventServices";
import { getEvents } from "../redux/EventSlice";
import ModalSlice from "../redux/ModalSlice";

export default function EventForm({ mode = "CREATE", prefilledFormData = null }) {
    const {updateToast} = ToastSlice.actions;
    const dispatch = useDispatch();
    const { allProfiles, currentProfile } = useSelector(store => store.profiles);
    const [formData, setFormData] = useState({
        "timezone": "UTC",
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": ""
    });
    const [formProfileData, setFormProfileData] = useState({});
    const {setEditFormModalVisible} = ModalSlice.actions;

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
        if(mode != "EDIT")
            responseData = await createEvent({ ...formData, profiles: getSelectedProfiles() });
        else
            responseData = await updateEvent({ ...formData, _id:prefilledFormData._id , profiles: getSelectedProfiles() });

        if (responseData.success) {
            setFormData({
                "timezone": "UTC",
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
            
            if(mode == "EDIT")
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
        <div className="content-box">
            <h3>{mode == "EDIT" ? "Edit Event" : "Create Event"}</h3>
            <form>
                <div className="form-ele-div">
                    <label htmlFor="profiles">Profiles</label>
                    <p>{displaySelectedProfilesCount()}</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {allProfiles.map((profile, idx) => <div key={idx}>
                            <input type="checkbox" id={profile._id} checked={formProfileData[profile._id] ?? false} onChange={handleProfilesSelection} />
                            <label>{profile.name}</label>
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
            </form>
            {mode != "EDIT" ?
                <button id="form-submit" onClick={handleSubmit}>+ Create Event</button>
                :
                <div>
                    <button onClick={() => dispatch(setEditFormModalVisible(false))}>Cancel</button>
                    <button onClick={handleSubmit}>Update</button>
                </div>
            }
        </div>
    );
}