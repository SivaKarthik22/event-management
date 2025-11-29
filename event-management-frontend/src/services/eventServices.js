import { eventAxiosInstance } from ".";

export async function createEvent(value){
    try{
        const response = await eventAxiosInstance.post("/create-event", value);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function updateEvent(value){
    try{
        const response = await eventAxiosInstance.put('/update-event', value);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function fetchEventsOfProfile(profileId){
    return new Promise((resolve, reject)=>{
        eventAxiosInstance.get(`/get-events-by-profile/${profileId}`)
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
}