import { useDispatch, useSelector } from "react-redux";
import ModalSlice from "../redux/ModalSlice";
import { useEffect, useState } from "react";
import { fetchLogsOfEvent } from "../services/logServies";
import { formatDay } from "../utilities/utils";

export default function LogsDisplay({eventObj}){
    const dispatch = useDispatch();
    const {setLogsModalVisible} = ModalSlice.actions;
    const [logs, setLogs] = useState([]);
    const { viewingTimezone } = useSelector(store => store.events);

    useEffect(()=>{
        async function makeAPICall(){
            const responseData = await fetchLogsOfEvent(eventObj._id)
            if(responseData.success){
                const data = calculateDifferencesInUpdates(responseData.data);
                setLogs(data);
            }
            else
                setLogs([]);
        }
        makeAPICall();
    }, []);

    function calculateDifferencesInUpdates(data){
        if(data.length == 0)
            return data;

        data[0].diff = [];
        for(let i=1; i<data.length; i++){
            data[i].diff = [];

            if(data[i-1].changes.profiles.length != data[i].changes.profiles.length)
                data[i].diff.push("profiles");
            else{
                const set = new Set();
                data[i-1].changes.profiles.forEach(profileId => set.add(profileId));
                for(const  profileId of data[i].changes.profiles){
                    if(set.has(profileId)) set.delete(profileId);
                    else break;
                }
                if(set.size != 0)
                    data[i].diff.push("profiles");
            }

            if(data[i].changes.timezone != data[i-1].changes.timezone)
                data[i].diff.push("timezone");
            if(data[i].changes.startDate != data[i-1].changes.startDate)
                data[i].diff.push("startDate");
            if(data[i].changes.startTime != data[i-1].changes.startTime)
                data[i].diff.push("startTime");
            if(data[i].changes.endDate != data[i-1].changes.endDate)
                data[i].diff.push("endTime");
            if(data[i].changes.endTime != data[i-1].changes.endTime)
                data[i].diff.push("endTime");
        }

        return data;
    }

    return(
        <div className="template-box scrollable" style={{position:"relative", height:"80%"}}>
            <button
                className="close-btn"
                onClick={()=>{ dispatch(setLogsModalVisible(false)) }}
            >✕</button>
            <h3>Event History</h3>
            <div>
                {
                    logs.length == 0 ? "No Logs found!" :
                    logs.map((log,idx)=><div className="log-item-box" key={idx}>
                        {log.action == "created" ? 
                            <p>Event Created at {formatDay(log.createdAt, viewingTimezone)}</p> : 
                            <>
                                <p>Event Updated at {formatDay(log.createdAt, viewingTimezone)}</p>
                                {log.diff.map((fieldName,index) => <p key={index}>
                                    event {fieldName} updated {fieldName != "profiles" ? `to ${log.changes[fieldName]}` : "" }
                                </p>)}
                            </>
                        }
                    </div>).reverse()
                }
            </div>
        </div>
    );
}