import { createSlice } from "@reduxjs/toolkit";
import { loadMatchWeeks } from "./MatchWeek.actions";

const initialState = {};
const matchweekSlice = createSlice({
    name:'matchweeks',
    initialState,
    reducers: {
        resetMatchweeks: (state)=>{return initialState},
    },
    extraReducers: builder => {
        builder
        .addCase(loadMatchWeeks.fulfilled, (state, action)=>{
            const {matchweeks} = action.payload;
            matchweeks.forEach(item =>{
                const {id} = item;
                state[id] = item;
            });
        })
    }
})

export const {resetMatchweeks} = matchweekSlice.actions;
export default matchweekSlice.reducer;