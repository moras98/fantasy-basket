import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsersTeams, fetchUserTeam, isModifiable, updatePlayerUserTeam, sellPlayerUserTeam, buyPlayerUserTeam } from "../../apis/user_team";

export const loadUserTeams = createAsyncThunk(
    'myTeam/loadUserTeams',
    async (params, thunkAPI) => {
        try {
            const response  = await fetchAllUsersTeams()
            return {
                usersTeams: response
            }
        } catch(err){
            throw err;
        }
    }
);

export const loadMyTeam = createAsyncThunk(
    'myTeam/loadMyTeam',
    async (params, thunkAPI) => {
        try {
            const response = await fetchUserTeam();
            return {
                myTeam: response
            }
        } catch(err) {
            throw err;
        }
    }
);

export const checkModifiable = createAsyncThunk(
    'myTeam/checkModifiable',
    async (params, thunkAPI) => {
        try {
            const response = await isModifiable();
            return {
                modifiable: response
            }
        } catch(err) {
            throw err;
        }
    }
);

export const makeUpdate = createAsyncThunk(
    'myTeam/makeUpdate',
    async ({column_name, player_id}, thunkAPI) => {
        try {
            const response = await updatePlayerUserTeam(column_name, player_id);
            return {
                myTeam: response
            }
        } catch(err){
            throw err;
        }
    }
);

export const sellPlayer = createAsyncThunk(
    'myTeam/sellPlayer',
    async({columnName, playerId, value}, thunkAPI) => {
        try {
            const response = await sellPlayerUserTeam(columnName, playerId, value);
            return {
                myTeam: response
            }
        } catch(err){
            throw err;
        }
    }
);

export const buyPlayer = createAsyncThunk(
    'myTeam/buyPlayer',
    async({columnName, playerId, value}, thunkAPI) => {
        try {
            const response = await buyPlayerUserTeam(columnName, playerId, value);
            return {
                myTeam: response
            }
        } catch(err){
            throw err;
        }
    }
);