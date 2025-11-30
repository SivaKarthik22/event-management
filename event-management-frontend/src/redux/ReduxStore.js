import { configureStore } from "@reduxjs/toolkit";
import ProfileSlice from "./ProfileSlice";
import ToastSlice from "./ToastSlice";
import EventSlice from "./EventSlice";
import ModalSlice from "./ModalSlice";

const ReduxStore = configureStore({
    reducer:{
        profiles: ProfileSlice.reducer,
        toast: ToastSlice.reducer,
        events: EventSlice.reducer,
        modal: ModalSlice.reducer
    }
});

export default ReduxStore;