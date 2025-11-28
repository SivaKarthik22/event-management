import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./ProfileSlice";
// import EventSlice from "./EventSlice";

const ReduxStore = configureStore({
    reducer:{
        profiles: ProfileSlice.reducer,
        // events: EventSlice.reducer,
    }
});

export default ReduxStore;