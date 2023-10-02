// Initial state 
const initialState = {
    capsules: [],
    isLoading: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Reducer cases 
        case 'ADD_CAPSULES':
            return {
                ...state,
                capsules: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
