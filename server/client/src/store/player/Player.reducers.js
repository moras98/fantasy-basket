import { createSlice } from "@reduxjs/toolkit";

import { loadPlayers, loadPlayerById, loadPlayersByTeam } from "./Player.actions";

const initialState = {};

const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        resetPlayers: (state) => {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(loadPlayerById.fulfilled, (state, action) => {
            const { player } = action.payload;
            state[player.id] = player;
        })
        .addCase(loadPlayers.fulfilled, (state, action) => {
            const { players } = action.payload;
            players.forEach( player => {
                const { id } = player;
                state[id] = player;
            });
            for (const player of players) {
                const { id } = player;
                state[id] = player;
            }
        })
        .addCase(loadPlayersByTeam.fulfilled, (state, action) => {
            const { players } = action.payload;
            players.forEach( player => {
                const { id } = player;
                state[id] = player;
            });
        })
    }
});

export const { resetPlayers } = playerSlice.actions;
export default playerSlice.reducer;