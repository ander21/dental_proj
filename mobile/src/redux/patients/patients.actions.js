import {getPatient, getPatients, addPatient} from '../utils/endPoints';
import * as ActionTypes from './patient.types';
import axios from 'axios';

export const getPatients = () => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING
    });
    axios.get(getPatients).then(res => {
        if(res.status === 200)
        {
            if (res.data.status) {
                dispatch({
                    type: ActionTypes.GET_PATIENTS_SUCCESS,
                    payload: res.data
                });
            }
            else
            {
                dispatch({
                    type: ActionTypes.GET_PATIENTS_FAILED,
                    payload: res.data
                });
            }
        }
    }).catch(err => {
        if(err.response.status)
        {
            dispatch({
                type: ActionTypes.GET_PATIENTS_FAILED,
                payload: err.response.data,
            });
        }
    })

}
