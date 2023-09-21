import { createSlice } from "@reduxjs/toolkit";
import { loadUsernames } from "../users/Users.actions";

const initialState = {};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(loadUsernames.fulfilled, (state, action)=>{
            const { users } = action.payload;
            users.forEach(user => {
                const { id } = user;
                state[id] = user;
            });
        })
    }
});

export default usersSlice.reducer;