import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchPlayers, fetchPlayerById, fetchTeamPlayers } from '../../apis/player';

export const loadPlayers = createAsyncThunk(
    'players/loadPlayers',
    async (params, thunkAPI) => {
        try {
            const response = await fetchPlayers();
            return {
                players: response
            }
        } catch(err) {
            throw err;
        }
    }
);

export const loadPlayerById = createAsyncThunk(
    'players/loadPlayerById',
    async (playerId, thunkAPI) => {
        try {
            const response = await fetchPlayerById(playerId);
            return {
                player: response
            }
        } catch(err) {
            throw err;
        }
    }
);

export const loadPlayersByTeam = createAsyncThunk(
    'players/loadPlayersByTeam',
    async (teamId, thunkAPI) => {
        try {
            const response = await fetchTeamPlayers(teamId);
            return {
                players: response
            }
        } catch(err){
            throw err
        }
    }
);

