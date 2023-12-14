import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMatchWeeks } from "../../apis/matchweek";

export const loadMatchWeeks = createAsyncThunk(
    'matchweeks/loadAll',
    async(params, thunkAPI) => {
        try {
            const response = await fetchMatchWeeks();
            return {
                matchweeks: response
            }
        } catch(err){
            throw(err);
        }
    }
);