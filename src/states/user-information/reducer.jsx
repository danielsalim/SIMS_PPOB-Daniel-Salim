import { ActionType } from './actions'; // Adjust the import path based on your project structure

const initialState = {
    token: null, // Initial state is set to null or you can use an empty string
};

function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload.token, // Set the token in the state
            };
        default:
            return state;
    }
}

export default tokenReducer;
