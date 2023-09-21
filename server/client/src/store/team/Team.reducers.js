import { createSlice } from "@reduxjs/toolkit";
import { loadTeamById, loadTeams } from "./Team.actions";

const initialState = {};

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(loadTeamById.fulfilled, (state, action)=>{
            const { team } = action.payload;
            state[team.id] = team;
        })
        .addCase(loadTeams.fulfilled, (state, action)=>{
            const { teams } = action.payload;
            teams.forEach(team => {
                const { id } = team;
                state[id] = team;
            });
        });
    }
});

export default teamSlice.reducer;
