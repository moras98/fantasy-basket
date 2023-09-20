import { createSlice } from "@reduxjs/toolkit";
import { buyPlayer, checkModifiable, loadMyTeam, loadUserTeams, sellPlayer } from "./UsersTeams.actions";

const initialState = {
    modifiable: false,
    error: null,
    allTeams: [],
    myTeam: {}
};

const userTeamSlice = createSlice({
    name: 'userTeams',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(loadUserTeams.fulfilled, (state, action) => {
            const {usersTeams} = action.payload;
            usersTeams.forEach(userTeam => {
                const { id } = userTeam;
                state.allTeams[id] = userTeam;
            });
        })
        .addCase(checkModifiable.fulfilled, (state, action) => {
            const { modifiable } = action.payload;
            state.modifiable = modifiable;
        })
        .addCase(loadMyTeam.fulfilled, (state, action) => {
            const { myTeam } = action.payload;
            state.myTeam = myTeam;
        })
        .addCase(sellPlayer.fulfilled, (state, action) => {
            const { myTeam } = action.payload;
            state.myTeam = myTeam;
        })
        .addCase(buyPlayer.fulfilled, (state, action) => {
            const { myTeam } = action.payload;
            state.myTeam = myTeam;
        })
    }
});

export default userTeamSlice.reducer;