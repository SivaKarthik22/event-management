import { useDispatch, useSelector } from "react-redux";
import ToastSlice from "../redux/ToastSlice";
import { useEffect } from "react";

export default function Toast(){
    const { toastType, toastTitle, toastContent, toastIsVisible } = useSelector(store => store.toast);
    const updateToast = ToastSlice.actions.updateToast;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!toastIsVisible)
            return;

        const timeoutId = setTimeout(()=>{
            dispatch(updateToast({
                toastType: "",
                toastTitle: "",
                toastContent: "",
                toastIsVisible: false,
            }));
        }, 5000);

        return ()=> {
            if(timeoutId)
                clearTimeout(timeoutId);
        }
    });

    if(!toastIsVisible)
        return "";

    return (
        <div id="toast-container" className={toastType}>
            <h3>{toastTitle}</h3>
            <p>{toastContent}</p>
        </div>
    );
}