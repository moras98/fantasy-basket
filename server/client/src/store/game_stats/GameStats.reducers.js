import { createSlice } from "@reduxjs/toolkit";

import { loadGameStatsById, loadPlayerStatsById, loadPlayerStatsByIdAndGame } from "./GameStats.actions";

const initialState = {};

const gameStatsSlice = createSlice({
    name: 'game_stats',
    initialState,
    reducers: {
        resetStats: (state) => {
            // Restablecer el estado de los equipos a su valor inicial
            return initialState;
          },
    },
    extraReducers: builder => {
        builder
        .addCase(loadGameStatsById.fulfilled, (state, action) => {
            const { game_stats } = action.payload;
            game_stats.forEach(stats => {
                const { id } = stats;
                state[id] = stats;
            });
        })
        .addCase(loadPlayerStatsById.fulfilled, (state, action) => {
            const { game_stats } = action.payload;
            game_stats.forEach(stats => {
                const { id } = stats;
                state[id] = stats;
            });
        })
        .addCase(loadPlayerStatsByIdAndGame.fulfilled, (state, action) => {
            const { stats } = action.payload;
            state[stats.id] = stats;
        })
    }
});

export const { resetStats } = gameStatsSlice.actions;
export default gameStatsSlice.reducer;