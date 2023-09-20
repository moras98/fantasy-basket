import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchUsernames } from "../../apis/user";

export const loadUsernames = createAsyncThunk(
    'users/loadUsernames',
    async (params, thunkAPI) => {
        try {
            const response = await fetchUsernames();
            return {
                users: response
            }
        } catch(err){
            throw err;
        }
    }
);