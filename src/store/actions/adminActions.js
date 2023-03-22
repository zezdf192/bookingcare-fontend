import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
} from '../../services/userService';

export const fetchGenderStart = () => {
    //type: actionTypes.FETCH_GENDER_START,
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            const res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (err) {
            dispatch(fetchGenderFailed());
        }
    };
};

export const fetchGenderSuccess = (gender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    gender: gender,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });

            const res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (position) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    position: position,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });

            const res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchRoleSuccess = (role) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    role: role,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new user successfully');
                dispatch(fetchGetAllUser());
                dispatch(createUserSuccess());
            } else {
                toast.error('Create user failed');
                dispatch(createUserFailed());
            }
        } catch (error) {
            toast.error('Create user failed');
            dispatch(createUserFailed());
        }
    };
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchGetAllUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchGetAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchGetAllUserFailed());
            }
        } catch (error) {
            dispatch(fetchGetAllUserFailed());
        }
    };
};

export const fetchGetAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_GET_ALL_SUCCESS,
    users: users,
});

export const fetchGetAllUserFailed = () => ({
    type: actionTypes.FETCH_GET_ALL_FAILED,
});

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user successfully');
                dispatch(fetchGetAllUser());
                dispatch(deleteUserSuccess());
            } else {
                toast.error('Delete user failed');
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            toast.error('Delete user failed');
            dispatch(deleteUserFailed());
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Edit user successfully');
                dispatch(fetchGetAllUser());
                dispatch(editUserSuccess());
            } else {
                toast.error('Edit user failed');
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error('Edit user failed');
            dispatch(editUserFailed());
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});
