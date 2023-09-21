import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTeams, fetchTeam } from '../../apis/team';

export const loadTeams = createAsyncThunk(
    'teams/loadTeams',
    async (params, thunkAPI) => {
        try {
            const response = await fetchTeams();
            return {
                teams: response
            }
        } catch(err){
            throw err;
        }
    }
);

export const loadTeamById = createAsyncThunk(
    'teams/loadTeamById',
    async (teamId, thunkAPI) => {
        try {
            const response = await fetchTeam(teamId);
            return {
                team: response
            }
        } catch(err){
            throw err;
        }
    }
);