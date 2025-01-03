import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './user-information/reducer';

const store = configureStore({
    reducer: {
        userState: tokenReducer,
    },
});

export default store;
