import { logsAxiosInstance } from ".";

export async function fetchLogsOfEvent(eventId){
    return new Promise((resolve, reject)=>{
        logsAxiosInstance.get(`/get-logs-by-event/${eventId}`)
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}