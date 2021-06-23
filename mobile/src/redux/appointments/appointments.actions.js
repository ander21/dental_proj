import  * as ActionTypes  from './appointments.types';
import {getAppointment, getAppointments, addAppointment} from '../utils/endPoints';
import axios from 'axios';

export const getAppointmentsAction = () => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING
    });
    axios.get(getAppointments).then(res => {
        if(res.status === 200)
        {
            if (res.data.status) {
                dispatch({
                    type: ActionTypes.GET_APPOINTMENTS_SUCCESS,
                    payload: res.data.appointments
                });
            }
            else
            {
                dispatch({
                    type: ActionTypes.GET_APPOINTMENTS_FAILED,
                    payload: res.data
                });
            }
        }
    }).catch(err => {
        if(err.response.status)
        {
            dispatch({
                type: ActionTypes.GET_APPOINTMENTS_FAILED,
                payload: err.response.data,
            });
        }
    })

}
