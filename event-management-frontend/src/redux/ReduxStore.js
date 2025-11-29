import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./ProfileSlice";
import ToastSlice from "./ToastSlice";
// import EventSlice from "./EventSlice";

const ReduxStore = configureStore({
    reducer:{
        profiles: ProfileSlice.reducer,
        toast: ToastSlice.reducer,
        // events: EventSlice.reducer,
    }
});

export default ReduxStore;