import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    position: [],
    role: [],
    users: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.gender = action.gender;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.gender = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.position;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.role;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.role = [];
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ALL_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ALL_FAILED:
            state.users = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
