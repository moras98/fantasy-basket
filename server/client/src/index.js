import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './store/rootReducer';
import './index.css';

// Initializes redux store
const store = configureStore({
  reducer: rootReducer
});

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
