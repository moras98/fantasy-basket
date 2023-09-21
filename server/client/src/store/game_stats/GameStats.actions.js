import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGameStatsById, fetchPlayerStatsById, fetchStatsByGameAndPlayer } from "../../apis/game_stats";

export const loadGameStatsById = createAsyncThunk(
    'game_stats/loadGameStatsById',
    async ({gameId}, thunkAPI) => {
        try {
            const response = await fetchGameStatsById(gameId);
            return {
                game_stats: response
            }
        } catch(err) {
            throw (err);
        }
    }
);

export const loadPlayerStatsById = createAsyncThunk(
    'game_stats/loadPlayerStatsById',
    async (playerId, thunkAPI) => {
        try {
            const response = await fetchPlayerStatsById(playerId);
            return {
                game_stats: response
            }
        } catch(err) {
            throw err;
        }
    }
);

export const loadPlayerStatsByIdAndGame = createAsyncThunk(
    'game_stats/loadPlayerStatsByIdAndGame',
    async ({playerId, gameId}, thunkAPI) => {
        try {
            const response = await fetchStatsByGameAndPlayer(playerId, gameId);
            return { 
                stats: response
            }
        } catch(err) { throw err} 
    }
);