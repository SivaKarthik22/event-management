import { profileAxiosInstance } from ".";

export async function createProfile(value){
    try{
        const response = await profileAxiosInstance.post("/create-profile", value);
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
