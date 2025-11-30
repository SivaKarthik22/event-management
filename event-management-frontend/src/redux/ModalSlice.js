import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
    name: 'modalSlice',
    initialState: {
        profileListModalVisible: false,
        editFormModalVisible: false,
        logsModalVisible: false,
    },
    reducers: {
        setProfileListModalVisible: function(state, action){
            state.profileListModalVisible = action.payload;
        },
        setEditFormModalVisible: function(state, action){
            state.editFormModalVisible = action.payload;
        },
        setLogsModalVisible: function(state, action){
            state.logsModalVisible = action.payload;
        },
    }
});

export default ModalSlice;