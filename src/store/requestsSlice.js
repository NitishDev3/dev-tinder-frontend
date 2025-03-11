import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const reqArray = state.filter(req => req._id !== action.payload);
            return reqArray;
        }
    }
})


export const { addRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;