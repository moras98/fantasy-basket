import { createSlice } from "@reduxjs/toolkit";
import { loadGames, loadGamesByTeamId } from "./Game.actions";

const initialState = {};
const gameSlice = createSlice({
    name:'games',
    initialState,
    reducers: {
        resetGames: (state) => {
            // Restablecer el estado de los equipos a su valor inicial
            return initialState;
          },
    },
    extraReducers: builder => {
        builder
        .addCase(loadGames.fulfilled, (state, action)=>{
            const { games } = action.payload;
            games.forEach(game => {
                const {id} = game;
                state[id] = game;
            });
        })
        .addCase(loadGamesByTeamId.fulfilled, (state, action)=>{
            const { games } = action.payload;
            games.forEach(game => {
                const {id} = game;
                state[id] = game;
            });
        })
    }
});

export const  { resetGames } = gameSlice.actions;
export default gameSlice.reducer;