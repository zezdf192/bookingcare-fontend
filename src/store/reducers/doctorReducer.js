import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctor: [],
    allDoctor: [],
    detailDoctor: {},
    markdown: {},
    scheduleTimes: [],
    requitedDoctor: {},
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.doctor;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.doctors;
            return {
                ...state,
            };
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctor = action.detailDoctor;
            return {
                ...state,
            };
        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            state.detailDoctor = {};
            return {
                ...state,
            };
        case actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS:
            state.markdown = action.markdown;
            return {
                ...state,
            };
        case actionTypes.GET_MARKDOWN_DOCTOR_FAILED:
            state.markdown = {};
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_TIMES_SUCCESS:
            state.scheduleTimes = action.scheduleTimes;
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_TIMES_FAILED:
            state.scheduleTimes = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUITED_DOCTOR_SUCCESS:
            state.requitedDoctor = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUITED_DOCTOR_FAILED:
            state.requitedDoctor = {};
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default doctorReducer;
