import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./ProfileSlice";
import ToastSlice from "./ToastSlice";
import EventSlice from "./EventSlice";
// import UtilitySlice from "./UtilitySlice";

const ReduxStore = configureStore({
    reducer:{
        profiles: ProfileSlice.reducer,
        toast: ToastSlice.reducer,
        events: EventSlice.reducer,
        // utilities: UtilitySlice.reducer,
    }
});

export default ReduxStore;