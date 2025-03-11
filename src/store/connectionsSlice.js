import { createSlice } from "@reduxjs/toolkit";

const connectionsSclice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: () => null,
    }
});

export const { addConnections, removeConnections } = connectionsSclice.actions;
export default connectionsSclice.reducer;