import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEventsOfProfile } from '../services/eventServices';

export const getEvents = createAsyncThunk('eventSlice/getEvents', async (profileId)=>{
    return new Promise((resolve, reject)=>{
        fetchEventsOfProfile(profileId)
        .then(responseData => {resolve(responseData.data)} )
        .catch(reject);
    });
});

const EventSlice = createSlice({
    name: 'eventSlice',
    initialState: {
        eventsOfProfile: [],
        eventsLoading: false,
        viewingTimezone: "UTC",
        // selectedEvent: null,
    },
    reducers: {
        setEventsOfProfile: function(state, action){
            state.eventsOfProfile = action.payload;
        },
        setViewingTimezone: function(state, action){
            state.viewingTimezone = action.payload;
        },
        /* setSelectedEvent: function(state, action){
            state.selectedEvent = action.payload;
        }, */
    },
    extraReducers: function (builder) {
        builder.addCase(getEvents.fulfilled, (state, action)=>{
            state.eventsOfProfile = action.payload;
            state.eventsLoading = false;
        });
        builder.addCase(getEvents.pending, (state, action)=>{
            state.eventsLoading = true;
        });
        builder.addCase(getEvents.rejected, (state, action)=>{
            state.eventsOfProfile = [];
            state.eventsLoading = false;
        });
    }
});

export default EventSlice;