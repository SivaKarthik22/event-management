import { profileAxiosInstance } from ".";

export async function createProfile(values){
    try{
        const response = await profileAxiosInstance.post("/create-profile", values);
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

export async function fetchAllProfiles(){
    try{
        const response = await profileAxiosInstance.get('/get-all-profiles');
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}

/* export function fetchAllProfiles(){
    return new Promise((resolve, reject)=>{
        profileAxiosInstance.get('/get-all-profiles')
        .then(response => {resolve(response.data)} )
        .catch(error => {reject(error.response.data)} );
    });
} */
