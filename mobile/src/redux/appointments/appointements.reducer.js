import * as ActionTypes from './appointments.types';

const initialState = {
    status: null,
    data: null,
    message: '',
    err: '',
    loading: false,
};

export default function(state = initialState, action) {
    switch(action.type)
    {
        case ActionTypes.LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                err: ''
            };
        case ActionTypes.GET_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                status: true,
                message: '',
                error: '',
            }
        case ActionTypes.GET_APPOINTMENTS_FAILED:
            return {
                ...state,
                status: false,
                data: null,
                message: action.payload.result.message,
                error: action.payload.result.error,
                loading: false,
            };
        default:
            return state;
    }
}
