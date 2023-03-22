import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    getTopDoctorService,
    getAllDoctorService,
    saveInfoDoctorService,
    getMarkdownService,
    editMarkdownService,
    getDetailInfoDoctorService,
} from '../../services/doctorService';

import { getAllCodeService } from '../../services/userService';

import { getAllSpecialty, getAllClinic } from '../../services/patientService';

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopDoctorService('');

            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            dispatch(fetchTopDoctorFailed());
        }
    };
};

export const fetchTopDoctorSuccess = (doctor) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    doctor: doctor,
});

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllDoctorService();

            if (res && res.errCode === 0) {
                let doctors = res.data;
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    doctors: doctors,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
        }
    };
};

export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await saveInfoDoctorService(data);

            if (res && res.errCode === 0) {
                toast.success('Save info doctor success');
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                });
            } else {
                toast.error('Save info doctor failed');
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error('Save info doctor failed');
            dispatch({
                type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
            });
        }
    };
};

export const getDetailInfoDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await getDetailInfoDoctorService(id);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
                    detailDoctor: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const getMarkdown = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await getMarkdownService(id);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_MARKDOWN_DOCTOR_SUCCESS,
                    markdown: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_MARKDOWN_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_MARKDOWN_DOCTOR_FAILED,
            });
        }
    };
};

export const editMarkdown = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editMarkdownService(data);

            if (res && res.errCode === 0) {
                toast.success('Save markdown success');
                dispatch({
                    type: actionTypes.PUT_MARKDOWN_DOCTOR_SUCCESS,
                });
            } else {
                toast.error('Save markdown failed');
                dispatch({
                    type: actionTypes.PUT_MARKDOWN_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error('Save markdown failed');
            dispatch({
                type: actionTypes.PUT_MARKDOWN_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });

            const res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIMES_SUCCESS,
                    scheduleTimes: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIMES_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_TIMES_FAILED,
            });
        }
    };
};

export const fetchRequitedDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const resPrice = await getAllCodeService('PRICE');
            const resPayment = await getAllCodeService('PAYMENT');
            const resProvince = await getAllCodeService('PROVINCE');
            const resSpecialty = await getAllSpecialty();
            const resClinic = await getAllClinic();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch({
                    type: actionTypes.FETCH_REQUITED_DOCTOR_SUCCESS,
                    data: data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_REQUITED_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_REQUITED_DOCTOR_FAILED,
            });
        }
    };
};
