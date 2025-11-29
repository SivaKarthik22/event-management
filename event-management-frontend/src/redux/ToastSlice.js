import { createSlice } from '@reduxjs/toolkit';

const ToastSlice = createSlice({
    name: 'toastSlice',
    initialState: {
        toastType: "warning",
        toastTitle: "",
        toastContent: "",
        toastIsVisible: false,
    },
    reducers: {
        updateToast: function(state, action){
            if("toastType" in action.payload)
                state.toastType = action.payload.toastType;
            if("toastTitle" in action.payload)
                state.toastTitle = action.payload.toastTitle;
            if("toastContent" in action.payload)
                state.toastContent = action.payload.toastContent;
            if("toastIsVisible" in action.payload)    
                state.toastIsVisible = action.payload.toastIsVisible;
        }
    }
});

export default ToastSlice;