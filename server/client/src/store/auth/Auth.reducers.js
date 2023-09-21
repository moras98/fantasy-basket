import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser, logoutUser, registerUser } from './Auth.actions';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      // Login failure
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      // Registration success
      .addCase(registerUser.fulfilled, (state, action) => {
        // const { error } = action.payload;
        // state.isAuthenticated = false;
        // state.error = error;
      })
      // Registration failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        // Aquí puedes realizar cualquier limpieza necesaria en el estado
        state.isAuthenticated = false;
        state.error = null;
      })
      // Logout failure
      .addCase(logoutUser.rejected, (state, action) => {
        // Manejar el error si es necesario
        console.error('Error al cerrar sesión', action.error);
      });
  }
});

// Export reducer function by default
export default authSlice.reducer;