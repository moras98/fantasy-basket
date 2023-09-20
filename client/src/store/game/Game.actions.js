import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchGamesByTeam } from "../../apis/game";

export const loadGames = createAsyncThunk(
    'games/loadGames',
    async(params, thunkAPI) => {
        try {
            const response = await fetchGames();
            return {
                games: response
            }
        } catch (err) {
            throw (err);
        }
    }
);

export const loadGamesByTeamId = createAsyncThunk(
    'games/loadGamesByTeamId',
    async (teamId, thunkAPI) => {
        try {
            const response = await fetchGamesByTeam(teamId);
            return {
                games: response
            }
        } catch(err) {
            throw (err);
        }
    }
);
