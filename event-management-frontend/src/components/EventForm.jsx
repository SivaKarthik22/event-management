import { useState } from "react";

export default function EventForm() {
    const [formData, setFormData] = useState({
        "profiles": null,
        "timezone": "",
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        const validationResult = formValid();
        if (validationResult != "OK") {
            alert(validationResult);
            return;
        }
        console.log(formData);
    };

    function formValid() {
        /* if (!formData.name || !formData.email || formData.age < 10)
            return false; */
        return "not OK";
    }

    const handleChange = event => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    return (
        <div className="content-box">
            <h3>Create Event</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-ele-div">
                    <label htmlFor="profiles">Profiles</label>
                    <button id="profiles" onClick={handleChange}>{formData.profiles ?? "Select profiles..."}</button>
                </div>

                <div className="form-ele-div">
                    <label htmlFor="timezone">Timezone</label>
                    <select id="timezone" onChange={handleChange} value={formData.timezone}>
                        <option>IST</option>
                        <option value="">Select Timezone</option>
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