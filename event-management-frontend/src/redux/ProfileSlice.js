import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProfiles } from '../services/profileServices';

export const getProfiles = createAsyncThunk('profileSlice/getProfiles', async ()=>{
    const responseData = await fetchAllProfiles();
    return responseData.data;
});

const ProfileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        currentProfile: null,
        allProfiles: [],
        profilesLoading: false,
    },
    reducers: {
        setCurrentProfile: function(state, action){
            state.currentProfile = action.payload;
        }
    },
    extraReducers: function (builder) {
        builder.addCase(getProfiles.fulfilled, (state, action)=>{
            state.allProfiles = action.payload;
            state.profilesLoading = false;
        });
        builder.addCase(getProfiles.pending, (state, action)=>{
            state.profilesLoading = true;
        });
        builder.addCase(getProfiles.rejected, (state, action)=>{
            state.allProfiles = [];
            state.profilesLoading = false;
        });
    }
});

export default ProfileSlice;